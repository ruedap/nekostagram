module ApplicationHelper

  # Public: Generate css class for controller name and action name.
  #
  # Returns HTML.
  def body_class
    "#{controller_name}-controller #{action_name}-action".underscore.dasherize
  end

  def target_tag
    ENV['INSTAGRAM_TARGET_TAG']
  end

  def target_cat?
    target_tag == 'cat'
  end
end
