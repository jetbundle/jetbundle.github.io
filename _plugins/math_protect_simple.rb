# Simplified Jekyll plugin to protect math blocks from kramdown table parsing
# This version is more defensive and only processes when absolutely necessary

module Jekyll
  module MathProtectSimple
    MATH_PIPE_PLACEHOLDER = 'MATH_PIPE_PLACEHOLDER_XYZ123'

    def self.protect_math(content)
      return content unless content.is_a?(String)
      return content unless content.include?('$') && content.include?('|')

      result = content.dup

      # Protect display math blocks first ($$...$$)
      display_math_placeholders = []
      result = result.gsub(/\$\$([^$]*?)\$\$/m) do |match|
        placeholder = "DISPLAY_MATH_#{display_math_placeholders.length}_PLACEHOLDER"
        display_math_placeholders << match
        placeholder
      end

      # Protect inline math: $...$ but not $$...$$
      # Use negative lookbehind/lookahead to avoid matching $$
      result = result.gsub(/(?<!\$)\$(?!\$)([^$\n]+?)\$(?!\$)/) do |match|
        math_content = $1
        # Only process if it contains a pipe
        if math_content.include?('|')
          protected = math_content.gsub(/\|/, MATH_PIPE_PLACEHOLDER)
          "$#{protected}$"
        else
          match
        end
      end

      # Restore display math
      display_math_placeholders.each_with_index do |math, index|
        result = result.gsub("DISPLAY_MATH_#{index}_PLACEHOLDER", math)
      end

      result
    end

    def self.restore_math(content)
      return content unless content.is_a?(String)
      return content unless content.include?(MATH_PIPE_PLACEHOLDER)
      content.gsub(MATH_PIPE_PLACEHOLDER, '|')
    end
  end

  # Only process diffequations collection
  Jekyll::Hooks.register [:documents], :pre_render do |doc|
    next unless doc.content.is_a?(String)
    next unless doc.respond_to?(:collection) && doc.collection&.label == 'diffequations'
    next unless doc.content.include?('$') && doc.content.include?('|')

    begin
      original_length = doc.content.length
      protected = Jekyll::MathProtectSimple.protect_math(doc.content)

      # Safety check: only apply if result is valid and similar length
      if protected && protected.is_a?(String) &&
         protected.length > original_length * 0.8 &&
         protected.length < original_length * 1.5
        doc.content = protected
      end
    rescue => e
      Jekyll.logger.warn "MathProtect error (skipping): #{e.message}"
    end
  end

  Jekyll::Hooks.register [:documents], :post_render do |doc|
    next unless doc.output.is_a?(String)
    next unless doc.respond_to?(:collection) && doc.collection&.label == 'diffequations'
    next unless doc.output.include?(Jekyll::MathProtectSimple::MATH_PIPE_PLACEHOLDER)

    begin
      restored = Jekyll::MathProtectSimple.restore_math(doc.output)
      if restored && restored.is_a?(String) && restored.length > 0
        doc.output = restored
      end
    rescue => e
      Jekyll.logger.warn "MathProtect restoration error (skipping): #{e.message}"
    end
  end
end
