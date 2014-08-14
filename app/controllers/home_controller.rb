# encoding: utf-8

class HomeController < ApplicationController
  include ApplicationHelper

  def index
    client = Instagram::Client.new(
      format: 'json',
      client_id: Instagram.client_id,
      client_secret: Instagram.client_secret
    )

    tag = target_cat? ? URI.encode('ねこ') : URI.encode('いぬ')

    begin
      @response = client.tag_recent_media(tag, max_tag_id: params[:max_tag_id])
    rescue
      @response = nil  # TODO: exception handling
    end
  end
end
