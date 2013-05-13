class ApplicationController < ActionController::Base
  protect_from_forgery
  before_filter :detect_locale

  private
  def detect_locale
    lang = accept_locale(request.env)
    I18n.locale = (lang == 'ja') ? 'ja' : 'en'
  end

  # https://github.com/rack/rack-contrib/blob/master/lib/rack/contrib/locale.rb
  def accept_locale(env)
    accept_langs = env["HTTP_ACCEPT_LANGUAGE"]
    return if accept_langs.nil?

    languages_and_qvalues = accept_langs.split(",").map { |l|
      l += ';q=1.0' unless l =~ /;q=\d+(?:\.\d+)?$/
      l.split(';q=')
    }

    lang = languages_and_qvalues.sort_by { |(locale, qvalue)|
      qvalue.to_f
    }.last.first

    lang == '*' ? nil : lang
  end
end
