# Jekyll plugin to protect math blocks from kramdown table parsing
# This preprocesses markdown to escape pipes inside $...$ math blocks
# so they don't get interpreted as table delimiters

module Jekyll
  module MathProtect
    MATH_PIPE_PLACEHOLDER = 'MATH_PIPE_PLACEHOLDER_XYZ123'
    
    def self.protect_math(content)
      return content unless content.include?('$') && content.include?('|')
      
      # Protect inline math blocks: $...$
      # Match $...$ but be careful not to match $$...$$ (display math)
      result = content.dup
      
      # First, protect display math blocks ($$...$$) by replacing with placeholder
      display_math_placeholders = []
      result.gsub!(/\$\$([^$]*?)\$\$/m) do |match|
        placeholder = "DISPLAY_MATH_PLACEHOLDER_#{display_math_placeholders.length}"
        display_math_placeholders << match
        placeholder
      end
      
      # Now protect inline math blocks: $...$ (but not $$)
      # Use non-greedy matching and ensure we don't match across paragraph boundaries
      result.gsub!(/\$([^$\n]+?)\$/) do |match|
        math_content = $1
        # Only replace pipes if they're inside the math block
        # Replace | with a placeholder that we'll restore later
        protected = math_content.gsub(/\|/, MATH_PIPE_PLACEHOLDER)
        "$#{protected}$"
      end
      
      # Restore display math blocks
      display_math_placeholders.each_with_index do |math, index|
        result.gsub!("DISPLAY_MATH_PLACEHOLDER_#{index}", math)
      end
      
      result
    end

    def self.restore_math(content)
      return content unless content.include?(MATH_PIPE_PLACEHOLDER)
      # Restore pipes in math blocks
      content.gsub(MATH_PIPE_PLACEHOLDER, '|')
    end
  end

  # Hook into the markdown conversion process
  Jekyll::Hooks.register [:pages, :documents], :pre_render do |doc|
    if doc.content.include?('$') && doc.content.include?('|')
      # Only process if both $ and | are present (potential conflict)
      doc.content = Jekyll::MathProtect.protect_math(doc.content)
    end
  end

  Jekyll::Hooks.register [:pages, :documents], :post_render do |doc|
    if doc.output.include?(Jekyll::MathProtect::MATH_PIPE_PLACEHOLDER)
      # Restore pipes after kramdown has processed the content
      doc.output = Jekyll::MathProtect.restore_math(doc.output)
    end
  end
end

