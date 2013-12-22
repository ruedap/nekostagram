source 'https://rubygems.org'

ruby '2.0.0'

gem 'rails', '4.0.2'

gem 'pg', '0.17.1'
gem 'haml', '4.0.3'
gem 'haml-rails', '0.5.3'
gem 'sass', github: 'nex3/sass'
gem 'sass-rails', '4.0.1'
gem 'compass', '1.0.0.alpha.17'
gem 'compass-rails', '1.1.2'
gem 'bootstrap-sass', '2.3.2.2'
gem 'jquery-rails', '3.0.4'
gem 'handlebars_assets', '~> 0.12.0'

gem 'instagram', '~> 0.10.0'
gem 'thin', '~> 1.5.1'
gem 'jbuilder', '~> 1.0.2'
gem 'ejs', '~> 1.1.1'
gem 'browser', '~> 0.1.6'

group :production, :staging do
  gem 'rails_12factor', '0.0.2' # for Heroku assets precompile
end

group :assets do
  gem 'coffee-rails', '4.0.1'
  gem 'uglifier', '>= 1.0.3'
end

group :development do
  gem 'better_errors', '~> 0.8.0'
  gem 'binding_of_caller', '~> 0.7.1'
  gem 'brakeman', '~> 1.9.4'
  gem 'pry-rails', '~> 0.2.2'
  gem 'pry-remote', '~> 0.1.7'
  gem 'xray-rails', '~> 0.1.5'
  gem 'figaro', '~> 0.6.4'
end

group :development, :test do
  gem 'rspec-rails', '~> 2.13.1'
end
