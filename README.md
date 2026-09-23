# 宇見顧問官方網站

宇見顧問有限公司（U Vision Consulting Limited）繁體中文及英文官方網站。

## 正式網站

🔗 **https://uvisionmacau.com**

| 頁面 | 網址 | 內容來源 |
| --- | --- | --- |
| 官網首頁 | `/` | `src/App.tsx`（React ＋ Vite） |
| 澳門樓宇滲漏水簡易自查 | `/leak/` | `public/leak/index.html`（純靜態） |
| 滲漏水落地頁 | `/leak/consult.html` | `public/leak/consult.html`（純靜態） |

推送到 `main` 即由 GitHub Actions 自動建置並部署到 GitHub Pages；
自訂域名為 `uvisionmacau.com`（無 www），`www` 版本由 GitHub 自動轉址過來。

滲漏水兩頁原置於 `ronlam1981/water_leakage` 倉庫，已於 2026-09-23 併入本倉庫。
該倉庫現只保留轉址頁與歷史紀錄，**請勿在那邊修改內容**。

## 本機預覽

```bash
npm install
npm run dev
```

## 建置

```bash
npm run build
```

`public/` 的檔案會原樣複製到 `dist/`，因此 `/leak/` 兩頁毋須經過打包。
`vite.config.ts` 的 `base` 為 `"./"`（相對路徑），令網站在自訂域名與
`github.io` 專案路徑下都能正確載入資源；站內連往 `/leak/` 的連結
因此也要用相對寫法（`leak/consult.html`），不要加開頭的斜線。

## 搜尋引擎

- `public/robots.txt`、`public/sitemap.xml`（本站是域名根目錄，robots.txt 生效）
- 首頁與 `/leak/` 兩頁各有自我指向的 `canonical` 與 `og:url`，以無 www 的
  `uvisionmacau.com` 為正本

## 品牌

品牌核心：清晰、遠見、同理心、同行。

> 釐清問題　看清選項
> See Clearly · Know Your Options
