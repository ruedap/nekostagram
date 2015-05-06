source 'https://rubygems.org'

ruby '2.2.2'

gem 'rails', '4.2.1'

gem 'thin', '1.6.3'
gem 'pg', '0.18.1'
gem 'haml', '4.0.6'
gem 'haml-rails', '0.5.3'
gem 'sass', '3.4.13'
gem 'sass-rails', '5.0.3'
gem 'jquery-rails', '4.0.3'
gem 'instagram', '1.1.5'
gem 'jbuilder', '2.2.13'
gem 'browser', '0.8.0'
gem 'coffee-rails', '4.1.0'
gem 'uglifier', '2.7.1'
gem 'rack-canonical-host', '0.1.0'
gem 'react-rails', '~> 1.0.0.pre', github: 'reactjs/react-rails'
gem 'sprockets-coffee-react', '2.4.1'
gem 'browserify-rails', '0.8.1'
gem 'autoprefixer-rails', '5.1.7'

group :production, :staging do
  gem 'rails_12factor', '0.0.2' # for Heroku assets precompile
end

group :development do
  gem 'better_errors', '1.0.1'
  gem 'binding_of_caller', '0.7.2'
  gem 'brakeman', '2.3.1'
  gem 'pry-rails', '0.3.2'
  gem 'pry-remote', '0.1.7'
end

group :development, :test do
  gem 'rspec-rails', '2.14.1'
  gem 'dotenv-rails', '0.11.1'
end
