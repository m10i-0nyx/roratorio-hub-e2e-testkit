# roratorio-hub-e2e-testkit
ROラトリオHubのためのE2Eテストキット

# インストール
コンテナを使用してテストを実行します。以下の手順でセットアップしてください。
## 前提条件
- Podman (またはDocker)

```bash
git clone https://github.com/m10i-0nyx/roratorio-hub-e2e-testkit
cd roratorio-hub-e2e-testkit
npm install
```

# 使用方法
```bash
chmod +x ./start_test.sh
./start_test.sh
```

# test spec開発
```bash
playwright codegen http://localhost/roratorio-hub/ro4/m/calcx.html
```
