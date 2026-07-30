# 🍑你喜欢 - GitHub Pages 部署指南

应用已开发完成，由于当前环境未完成 GitHub 授权，以下是手动部署到 GitHub Pages 获取永久访问地址的步骤。

---

## 方式一：通过浏览器上传（最简单，无需安装任何工具）

1. **下载代码包**：`peach-workbench.zip`（已生成在项目根目录）
2. 解压到本地任意文件夹
3. 打开 https://github.com/new ，创建一个新仓库：
   - Repository name 填 `peach-workbench`（或任意名字）
   - 选择 **Public**
   - 勾选 **Add a README file**
   - 点击 **Create repository**
4. 在新仓库页面点击 **uploading an existing file**（上传文件链接）
5. 将解压后的所有文件（`index.html`、`manifest.json`、`sw.js`、`404.html`、`icons/` 文件夹、`assets/` 文件夹）拖入上传区域
6. 点击 **Commit changes** 提交
7. 进入仓库 **Settings → Pages**
8. 在 **Build and deployment** 下方：
   - Source 选择 **Deploy from a branch**
   - Branch 选择 `main`，文件夹选 `/ (root)`
   - 点击 **Save**
9. 等待 1-2 分钟，页面顶部会显示你的永久访问地址：
   ```
   https://你的用户名.github.io/peach-workbench/
   ```

---

## 方式二：通过命令行（Git）

```bash
# 1. 解压代码包
unzip peach-workbench.zip -d peach-workbench
cd peach-workbench

# 2. 初始化并提交
git init
git add -A
git commit -m "Initial commit: 🍑你喜欢"

# 3. 创建 GitHub 仓库并推送（替换 YOUR_USERNAME）
gh repo create peach-workbench --public --source=. --push
# 或手动添加远程：
git remote add origin https://github.com/YOUR_USERNAME/peach-workbench.git
git branch -M main
git push -u origin main

# 4. 启用 GitHub Pages
gh api repos/YOUR_USERNAME/peach-workbench/pages -X POST \
  -f "build_type=workflow" -f "source[branch]=main" -f "source[path]=/"
```

启用后访问：`https://YOUR_USERNAME.github.io/peach-workbench/`

---

## PWA 安装到手机桌面

部署完成后用手机浏览器打开地址：
- **iPhone/Safari**：点击底部分享按钮 → 添加到主屏幕
- **Android/Chrome**：点击右上角菜单 → 添加到主屏幕
- 桌面图标会显示 🍑 桃子图案

---

## 自定义头像

应用默认使用一个可爱的桃子卡通头像。要替换为你自己的照片：

### 方法 A：在应用内上传（推荐）
打开应用 → 点击左上角头像 → 选择你的照片 → 自动保存到浏览器本地

### 方法 B：替换文件
将你的照片命名为 `avatar.jpg`，覆盖 `assets/avatar.jpg` 文件，重新提交即可

---

## 数据管理

- 所有数据存储在浏览器 localStorage 中，不同设备/浏览器之间不共享
- 点击右上角 **📤** 导出 JSON 备份
- 点击右上角 **📥** 导入 JSON 恢复
- 建议定期导出备份

---

## 文件结构

```
peach-workbench/
├── index.html          # 主应用（含全部样式和逻辑）
├── manifest.json       # PWA 配置
├── sw.js               # Service Worker（离线缓存）
├── 404.html            # 404 重定向
├── assets/
│   └── avatar.jpg      # 默认头像（可替换）
└── icons/              # PWA 图标（桃子图案）
    ├── icon-192.png
    ├── icon-256.png
    ├── icon-384.png
    ├── icon-512.png
    ├── maskable-512.png
    ├── apple-touch-icon.png
    ├── favicon-32.png
    └── favicon-16.png
```
