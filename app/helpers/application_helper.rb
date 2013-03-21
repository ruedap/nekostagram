module ApplicationHelper

  # Public: Generate css class for controller name and action name.
  #
  # Returns HTML.
  def body_class
    "#{controller_name}-controller #{action_name}-action".underscore.dasherize
  end

end
