# 🍑你喜欢 - GitHub Pages 部署指南

**应用已自动部署完成，永久访问地址：**

## https://feidudu5527.github.io/peach-workbench/

以下内容为原始部署记录，留作参考。

---

## 手动部署方式（已通过自动方式完成）

### 方式一：通过浏览器上传

1. 在 GitHub 创建一个名为 `peach-workbench` 的 Public 仓库
2. 上传所有文件到仓库根目录
3. 进入仓库 **Settings → Pages**
4. Branch 选择 `main`，文件夹选 `/ (root)`，点击 Save
5. 等待 1-2 分钟，访问 `https://你的用户名.github.io/peach-workbench/`

### 方式二：通过命令行

```bash
cd peach-workbench
git init
git add -A
git commit -m "Initial commit"
gh repo create peach-workbench --public --source=. --push
gh api repos/你的用户名/peach-workbench/pages -X POST \
  -f "source[branch]=main" -f "source[path]=/"
```

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
- 点击右上角 📤 导出 JSON 备份
- 点击右上角 📥 导入 JSON 恢复
- 建议定期导出备份
