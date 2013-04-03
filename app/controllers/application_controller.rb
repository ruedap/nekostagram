class ApplicationController < ActionController::Base
  protect_from_forgery
  before_filter :detect_locale

  private
  def detect_locale
    lang = request.headers['Accept-Language'].scan(/^[a-z]{2}/).first
    I18n.locale = (lang == 'ja') ? 'ja' : 'en'
  end
end
