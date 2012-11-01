## Nekostagram / Inustagram


### これは何？

ねこ大好き専用／いぬ大好き専用のインスタグラムビューアー。  
[http://nekostagram.heroku.com/](http://nekostagram.heroku.com/)  
[http://inustagram.heroku.com/](http://inustagram.heroku.com/)  
上記URLで動作しているHeroku用Webアプリのソースコード。  

---

### コード内で使用しているHeroku環境変数

    ENV['INSTAGRAM_TARGET_TAG']        = 'Instagram APIで検索するタグの文字列'
    ENV['INSTAGRAM_ACCESS_TOKEN']      = 'Instagram APIのアクセストークン'
    ENV['GOOGLE_ANALYTICS_ID']         = 'Google AnalyticsのID'
    ENV['STAGING_BASIC_AUTH_USERNAME'] = 'ステージング環境のBasic認証用ユーザーネーム'
    ENV['STAGING_BASIC_AUTH_PASSWORD'] = 'ステージング環境のBasic認証用パスワード'

---

### Copyright

Copyright &copy; 2011 ruedap. See LICENSE for details.

