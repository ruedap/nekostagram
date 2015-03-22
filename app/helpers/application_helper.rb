module ApplicationHelper
  def target_tag
    ENV['INSTAGRAM_TARGET_TAG']
  end

  def target_cat?
    target_tag == 'cat'
  end
end
