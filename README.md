# tips_page

Cloudflare Pages と Workers を組み合わせた、API 接続の学習用サンプルです。

## 構成

- `pages/`: 静的フロントエンド。Worker のベース URL を入力して API を呼び出します。
- `worker/`: Cloudflare Workers の API。

## ローカル確認

```powershell
Set-Location .\worker
npm install
npm run dev
```

`pages/index.html` をブラウザーで開き、Worker ベース URL が `http://127.0.0.1:8787` になっていることを確認します。

## デプロイ

```powershell
Set-Location .\worker
npm run deploy
```

Pages のビルド設定は、ビルドコマンドを空欄、出力ディレクトリを `pages` にします。デプロイ後、画面の Worker ベース URL を発行された `https://<worker-name>.<subdomain>.workers.dev` に変更してください。

本番では `worker/wrangler.toml` の `ALLOWED_ORIGIN` を Pages の公開 URL に設定してから再デプロイします。

## API

- `GET /api`: 稼働状態
- `GET /api/course`: 学科紹介
- `GET /api/hello?name=山田`: 名前付き挨拶。`name` がない場合は `400`
- `GET /api/fortune`: おみくじ
- `GET /api/events`: イベント一覧
- 未定義パス: `404`