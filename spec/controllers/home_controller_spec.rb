# encoding: utf-8

require 'spec_helper'

describe HomeController, type: :controller do
  describe 'GET #index' do
    it 'ステータスコード200を返す' do
      get :index, {}
      expect(response).to be_success
      expect(response.status).to eq(200)
    end
  end
end
