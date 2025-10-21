# 🚀 博客项目启动指南

## 前置要求

- **Git** - 版本控制工具
- **Node.js 14+** - JavaScript 运行环境
- **PostgreSQL 数据库** - 本地或云端
- **GitHub 账号** - 用于 OAuth 登录
- **代码编辑器** - 推荐 VSCode

---

## 步骤 0: 克隆项目到本地

首先需要将代码仓库克隆到你的本地电脑：

```bash
# 克隆仓库（替换为你的仓库地址）
git clone https://github.com/ENAwareness/blogr-nextjs-prisma.git

# 进入项目目录
cd blogr-nextjs-prisma

# 切换到开发分支（如果需要）
git checkout claude/describe-project-011CUKWbcVnHFpzAjzJo8BS1
```

**使用 VSCode 打开项目：**

```bash
# 方式 1: 命令行打开
code .

# 方式 2: 手动打开
# 打开 VSCode -> File -> Open Folder -> 选择项目文件夹
```

---

## 步骤 1: 安装依赖

在项目根目录下运行：

```bash
npm install
```

---

## 步骤 2: 设置 PostgreSQL 数据库

### 选项 A: 本地 PostgreSQL

1. 安装 PostgreSQL（如果未安装）
2. 创建数据库：
```bash
# 登录 PostgreSQL
psql -U postgres

# 创建数据库
CREATE DATABASE blogr;

# 创建用户（可选）
CREATE USER bloguser WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE blogr TO bloguser;
```

### 选项 B: 使用云数据库

可以使用免费的云数据库服务：
- **Vercel Postgres** (推荐)
- **Supabase**
- **Railway**
- **Neon**

---

## 步骤 3: 配置环境变量

复制示例文件并编辑：

```bash
cp .env.example .env
```

编辑 `.env` 文件：

```env
# === 数据库配置 ===

# 本地 PostgreSQL 配置
POSTGRES_PRISMA_URL="postgresql://bloguser:your_password@localhost:5432/blogr"
POSTGRES_URL_NON_POOLING="postgresql://bloguser:your_password@localhost:5432/blogr"

# 或者如果使用云数据库，粘贴提供的连接字符串


# === GitHub OAuth 配置 ===

# 1. 访问: https://github.com/settings/developers
# 2. 点击 "New OAuth App"
# 3. 填写:
#    - Application name: My Blog
#    - Homepage URL: http://localhost:3000
#    - Authorization callback URL: http://localhost:3000/api/auth/callback/github
# 4. 创建后复制 Client ID 和 Client Secret

GITHUB_ID="你的_github_client_id"
GITHUB_SECRET="你的_github_client_secret"


# === NextAuth Secret ===

# 生成随机密钥:
# 运行: openssl rand -base64 32
# 或访问: https://generate-secret.vercel.app/32

SECRET="你的_32位随机字符串"
```

---

## 步骤 4: 初始化数据库

运行 Prisma 迁移来创建数据库表：

```bash
npx prisma db push
```

（可选）打开 Prisma Studio 查看数据库：
```bash
npx prisma studio
```

---

## 步骤 5: 启动开发服务器

```bash
npm run dev
```

服务器将在 **http://localhost:3000** 启动

---

## 🎉 使用博客

1. **访问首页**: http://localhost:3000
2. **登录**: 点击右上角 "Log in" 按钮，使用 GitHub 账号登录
3. **创建文章**: 登录后点击 "New post" 创建草稿
4. **发布文章**: 进入草稿详情页，点击 "Publish" 发布到首页
5. **查看草稿**: 点击导航栏的 "My drafts" 查看所有草稿

---

## 📝 其他命令

```bash
# 生产环境构建
npm run build

# 启动生产服务器
npm start

# 查看数据库
npx prisma studio

# 重置数据库（谨慎使用）
npx prisma db push --force-reset
```

---

## ⚠️ 常见问题

### 1. 数据库连接失败
- 检查 PostgreSQL 是否运行: `pg_isready`
- 确认 `.env` 文件中的连接字符串正确
- 确认数据库已创建

### 2. GitHub OAuth 失败
- 确认 GitHub OAuth App 的回调 URL 正确
- 检查 `GITHUB_ID` 和 `GITHUB_SECRET` 是否正确
- 确认 `SECRET` 已设置

### 3. Prisma 错误
- 运行 `npx prisma generate` 重新生成客户端
- 运行 `npx prisma db push` 同步数据库

### 4. 端口被占用
- 更改端口: `PORT=3001 npm run dev`

---

## 🎨 设计说明

此项目采用**日式极简设计风格**：
- 浅灰色调配色方案
- 大量留白与呼吸感
- 柔和的边框与阴影
- 优雅的排版与过渡动画

---

## 📚 技术栈

- **框架**: Next.js 12
- **数据库**: PostgreSQL + Prisma ORM
- **认证**: NextAuth.js (GitHub OAuth)
- **样式**: CSS-in-JS (styled-jsx)
- **语言**: TypeScript
