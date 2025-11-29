# Jekyll plugin to protect math expressions from Kramdown/Liquid processing
# This preprocesses math blocks before Jekyll processes them

module Jekyll
  module MathProtection
    # Protect math blocks from Liquid and Kramdown interference
    def self.protect_math(content)
      return content unless content

      # Pattern 1: Inline math $...$
      # Wrap in nomarkdown extension to prevent Kramdown processing
      content = content.gsub(/(?<!\\)\$\$?([^$\n]+?)\$\$?(?![$])/) do |match|
        # Skip if already protected
        next match if match.include?('{::nomarkdown}')

        # Check if it's display math ($$) or inline ($)
        is_display = match.start_with?('$$') && match.end_with?('$$')
        math_content = match.gsub(/\$\$?/, '')

        if is_display
          "{::nomarkdown}\n$$#{math_content}$$\n{:/nomarkdown}"
        else
          "{::nomarkdown}$#{math_content}${:/nomarkdown}"
        end
      end

      # Pattern 2: Display math blocks (multiline)
      content = content.gsub(/\$\$\s*\n([\s\S]*?)\n\s*\$\$/) do |match|
        # Skip if already protected
        next match if match.include?('{::nomarkdown}')

        math_content = $1
        "{::nomarkdown}\n$$\n#{math_content}\n$$\n{:/nomarkdown}"
      end

      content
    end
  end
end

# Hook to process content before rendering
Jekyll::Hooks.register [:pages, :documents], :pre_render do |post|
  if post.content
    # Only process diffequations collection
    if post.data && post.data['collection'] == 'diffequations'
      post.content = Jekyll::MathProtection.protect_math(post.content)
    end
  end
end
