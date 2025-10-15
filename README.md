# roratorio-hub-e2e-testkit
ROラトリオHubのためのPlaywright E2Eテストキット

# インストール
コンテナを使用してテストを実行します。以下の手順でセットアップしてください。
## 前提条件
- Podman

```bash
git clone https://github.com/m10i-0nyx/roratorio-hub-e2e-testkit
cd roratorio-hub-e2e-testkit
# コンテナイメージのビルド
./build_container_images.sh
```

# 使用方法
```bash
chmod +x ./start_test_amd64.sh
./start_test_amd64.sh
```

# test spec開発
```bash
playwright codegen http://localhost/roratorio-hub/ro4/m/calcx.html
```
