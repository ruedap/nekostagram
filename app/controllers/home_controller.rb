# encoding: utf-8

class HomeController < ApplicationController
  def index
    client = Instagram::Client.new(
      format: 'json',
      client_id: Instagram.client_id,
      client_secret: Instagram.client_secret
    )
    @cats = client.tag_recent_media(URI.encode('ねこ'))
  end
end
