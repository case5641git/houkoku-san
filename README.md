# houkoku-san

## 環境構築

`docker-compose.yml`が存在するディレクトで  
`docker-compose build`を実行  
ビルドが完了したら  
`docker-compose up -d`を実行  
`docker-compose ps`で 6 つのコンテナの`STATUS`が`UP`になっていることを確認

### DB

`docker-compose exec db mysql -u roo -p`を実行して DB にアクセス可能か確認  
また、`http://localhost:8080/`にアクセスして、phpMyAdmi にアクセス可能か確認

### Backend

`docker-compose exec app bash`を実行して、コンテナ内に入り、以下のコマンドを実行
`composer install`パッケージのインストール
`php artisan migrate`マイグレーションの実行  
`php artisan db:seed`初期データの追加  
`php artisan serve --host=0.0.0.0 --port=8000`を実行して  
`http://localhost:8000`にアクセスして Laravel の画面が表示されるか確認

### Frontend

`docker-compose exec web sh`を実行して、コンテナ内に入り、以下のコマンドを実行  
`npm install`依存パッケージの install  
`npm start`React を起動  
`http://localhost:3000`にアクセスして React の画面が表示されるか確認

## トラブルシューティング

随時更新

## Commit Messages

### Format

tags: #タスク番号 変更内容  
例) refactor: #001 コメント変更

### Tags

feature:機能追加・更新  
refactor:リファクタリング・コードスタイル・コードフォーマット修正など  
fix:バグ修正

## ブランチ

main : デプロイ用ブランチ  
develop : 開発用ブランチ  
feature/task-xx : タスクごとのブランチ、xx にタスク番号を入力
