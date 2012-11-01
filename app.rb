require 'open-uri'
require 'uri'
require 'pp'

require 'rubygems'
require 'json'
require 'sinatra'
require 'sinatra/r18n'
require 'sinatra/iphone_views'
require 'slim'
require 'sass'

configure :development do
  require 'secret/env.rb'
end

configure :development, :staging do
  Slim::Engine.set_default_options :pretty => true
end

configure :staging do
  use Rack::Auth::Basic do |username, password|
    username == ENV['STAGING_BASIC_AUTH_USERNAME'] && password == ENV['STAGING_BASIC_AUTH_PASSWORD']
  end
end

configure :production do
  set :sass, { :style => :compressed }
end

before do
  @google_analytics_id = ENV['GOOGLE_ANALYTICS_ID']

  @target_tag  = ENV['INSTAGRAM_TARGET_TAG'] || 'cat'
  @target_path = "/#{@target_tag}"
  @target_url  = "https://api.instagram.com/v1/tags#{@target_path}/media/recent?access_token="
  @base_url    = @target_url + ENV['INSTAGRAM_ACCESS_TOKEN']
  @data        = []
  @error       = false

  # sinatra-r18n
  set :translations, "./i18n/#{@target_tag}/"

  cat_block_list_id = %w(
    619782f2ea01462aacc92aa4d9586618
    b9d6177b64b54632ae21dd23c4177174
    ef2e316e043d42b49a463a93b97b7401
    40776424c8754a069ce17fed2e10f9b6
    481471f95a124d3c9ef27436926201b9
    0d3e982cbb8b494ca06bcf94c841fdcf
    db9334ea105840a883ebafd5af1c4256
    9c10b2f52889489c8e04060fb1dbb4c1
    9958b12e5b30491489f7dc107dac082d
    732bb8c2b21a4ecbb58f00d3b180a075
  )

  dog_block_list_id = %w(
    791f744c227a41acb461f98f0c0195ca
    d7321ff3214a4af2a93c0d54b508c68e
    b619fb4b326f434da139b320f802a696
    60d047a75eeb49d085dd8ee586d20e53
    b4d685fd605d4dd9a20151ac31f5cee6
    e988aec1260b4c828af8c0b6f370bbfa
    e29866169d18434fa341c913e7ed8f0a
  )

  @block_list_id = cat_block_list_id | dog_block_list_id
end

get '/' do
  create_data
  slim :index
end

put '/' do
  create_data(params[:max_id])
  slim :index
end

get '/error' do
  @error = true
  slim :error
end

get '/style.css' do
  sass "style_#{@target_tag}".to_sym
end

private
def create_data(max_id = nil)
  json = parse_json(create_max_id_url(max_id))

  redirect '/error' unless json['meta']['code'] && json['meta']['code'] == 200

  @data = extract_data(json['data'])
  @max_id = check_id(json['pagination']['next_max_id'])
end

def create_max_id_url(max_id = nil)
  return @base_url unless max_id
  @base_url + "&max_id=#{max_id}"
end

def check_id(max_id)
  return nil unless max_id
  begin
    return max_id if max_id == max_id.to_i.to_s
  rescue
    redirect '/error' #TODO
  end
  nil
end

def parse_json(url)
  begin
    str = open(url) do |data|
      data.read
    end
  rescue
    redirect '/error' #TODO
  end

  begin
    json = JSON.parse(str)
  rescue
    redirect '/error' #TODO
  end
  json
end

def extract_data(data)
  redirect '/error' if data.empty? #TODO

  result = []
  data.each do |v|
    hash = {}
    hash['thumbnail']    = v['images']['thumbnail']['url']
    hash['low']          = v['images']['low_resolution']['url']
    hash['standard']     = v['images']['standard_resolution']['url']
    hash['created_time'] = v['created_time']
    hash['link']         = v['link']
    hash['likes']        = v['likes']
    hash['location']     = v['location']
    hash['caption']      = v['caption'] ? v['caption']['text'] : nil

    if check_block_list(hash)
      hash['low']     = "#{@target_path}/images/oops.gif"
      hash['caption'] = nil
      hash['link']    = nil
    end

    result.push hash
  end
  result
end

def check_block_list(hash)
  return false if @block_list_id.empty?
  @block_list_id.each do |bl|
    return true if hash['low'].include?(bl)
  end
  false
end

