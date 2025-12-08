# Electron 现代化技术架构 脚手架

<div align="center">

![Electron](https://img.shields.io/badge/Electron-28+-9FEAF9.svg?style=for-the-badge&logo=electron&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5+-646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-latest-000000.svg?style=for-the-badge&logo=shadcnui&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-v4-06B6D4.svg?style=for-the-badge&logo=tailwindcss&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-3178C6.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer%20Motion-latest-0055FF.svg?style=for-the-badge&logo=framer&logoColor=white)

基于 **Electron + Vite + shadcn/ui + Tailwind CSS + Framer Motion** 构建的下一代桌面应用开发模板

[快速开始](#快速开始) •
[功能特性](#功能特性) •
[项目架构](#项目架构) •
[开发指南](#开发指南) •
[部署构建](#部署构建)

</div>

## ✨ 功能特性

### 🚀 现代化技术栈
- **Electron 28+** - 跨平台桌面应用框架，支持最新特性
- **Vite 5+** - 极速构建工具，5倍构建速度提升
- **shadcn/ui** - 现代化组件库，基于 Radix UI 原语
- **Tailwind CSS v4** - 实用优先的 CSS 框架，支持 OKLCH 色彩空间
- **Framer Motion** - 生产就绪的动画库
- **TypeScript 5+** - 主进程和渲染进程全面类型支持

### 🎨 UI/UX 特性
- ✅ **自定义标题栏** - 无边框窗口，完全自定义的窗口控制
- ✅ **流畅动画效果** - 基于 Framer Motion 的微交互动画
- ✅ **响应式设计** - 适配不同屏幕尺寸和分辨率
- ✅ **现代化主题** - 深色主题设计，支持 OKLCH 色彩空间
- ✅ **组件化架构** - 基于 shadcn/ui 的可复用组件

### 🏗️ 开发体验
- ✅ **热重载开发** - 开发过程中即时预览更改
- ✅ **类型安全** - 严格的 TypeScript 类型检查
- ✅ **模块化架构** - 清晰的关注点分离
- ✅ **IPC 通信** - 主进程和渲染进程间的类型安全通信
- ✅ **代码规范** - ESLint + Prettier 自动格式化

## 🚀 快速开始

### 环境要求

- **Node.js** >= 18.0.0
- **pnpm** >= 8.0.0

### 安装依赖

```bash
# 克隆项目
git clone git@github.com:gyy66/Modern-Electron-architecture.git
cd Modern-Electron-architecture

# 安装依赖
pnpm install
```

### 开发模式

```bash
# 启动开发服务器
pnpm dev
```

开发服务器将在 `http://localhost:5173` 启动，Electron 窗口会自动打开。

### shadcn/ui 组件集成

```bash
# 添加 shadcn/ui 组件
pnpm dlx shadcn@canary add <component-name>

# 例如：添加按钮组件
pnpm dlx shadcn@canary add button
```

## 📁 项目架构

```
src/
├── main/                      # 主进程
│   ├── app/                   # 应用核心模块
│   │   └── window-manager.ts  # 窗口管理器
│   ├── ipc/                   # IPC 通信
│   │   ├── handlers/          # IPC 处理器
│   │   │   └── window-handlers.ts
│   │   └── index.ts
│   └── index.ts               # 主进程入口
├── preload/                   # 预加载脚本
│   ├── index.d.ts            # 类型定义
│   └── index.ts              # 预加载入口
└── renderer/                  # 渲染进程
    ├── src/
    │   ├── components/        # 组件目录
    │   │   ├── layout/        # 布局组件
    │   │   │   └── TitleBar.tsx  # 自定义标题栏
    │   │   └── ui/            # shadcn/ui 组件
    │   ├── lib/               # 工具库
    │   ├── styles/            # 样式文件
    │   │   └── main.css       # 主样式文件
    │   ├── types/             # 类型定义
    │   ├── App.tsx            # 应用主组件
    │   └── main.tsx           # 渲染进程入口
    └── index.html             # HTML 模板
```

## 🎯 核心功能实现

### 自定义标题栏

项目实现了完全自定义的标题栏，包含：

- **窗口控制** - 最小化、最大化/还原、关闭
- **拖拽区域** - 支持窗口拖拽移动
- **状态同步** - 实时同步窗口最大化状态
- **动画效果** - 流畅的按钮交互动画

```typescript
// TitleBar 组件核心实现
const handleMaximize = async () => {
  if (window.api?.window?.maximize) {
    const maximized = await window.api.window.maximize()
    setIsMaximized(maximized)
  }
}
```

### IPC 通信架构

类型安全的 IPC 通信实现：

```typescript
// 预加载脚本 API 定义
const api = {
  window: {
    minimize: () => ipcRenderer.invoke('window-minimize'),
    maximize: () => ipcRenderer.invoke('window-maximize'),
    close: () => ipcRenderer.invoke('window-close'),
    isMaximized: () => ipcRenderer.invoke('window-is-maximized')
  }
}
```

### shadcn/ui 集成

完整的 shadcn/ui 组件库集成：

```typescript
// 组件使用示例
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
```

## 🛠️ 开发指南

### 添加新组件

1. **UI 组件**（推荐使用 shadcn/ui）：
```bash
pnpm dlx shadcn@canary add <component-name>
```

2. **自定义组件**：
```typescript
// src/renderer/src/components/MyComponent.tsx
import { motion } from 'framer-motion'

export default function MyComponent() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-4"
    >
      我的组件
    </motion.div>
  )
}
```

### 添加 IPC 通信

1. **主进程处理器**：
```typescript
// src/main/ipc/handlers/my-handlers.ts
import { ipcMain } from 'electron'

export function registerMyHandlers() {
  ipcMain.handle('my-action', async () => {
    // 处理逻辑
    return result
  })
}
```

2. **预加载脚本 API**：
```typescript
// src/preload/index.ts
const api = {
  myApi: {
    doAction: () => ipcRenderer.invoke('my-action')
  }
}
```

3. **渲染进程调用**：
```typescript
// 组件中使用
const handleAction = async () => {
  const result = await window.api.myApi.doAction()
}
```

### 样式开发

项目使用 Tailwind CSS v4 和自定义 CSS 变量：

```css
/* 支持 OKLCH 色彩空间 */
:root {
  --primary: oklch(0.208 0.042 265.755);
  --background: oklch(1 0 0);
}

/* 自定义动画 */
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
```

## 📦 部署构建

### 开发构建

```bash
# 构建渲染进程
pnpm build:renderer

# 构建主进程
pnpm build:main
```

### 平台构建

```bash
# Windows 构建
pnpm build:win

# macOS 构建  
pnpm build:mac

# Linux 构建
pnpm build:linux

# 全平台构建
pnpm build
```

### 构建配置

项目使用 `electron-builder` 进行打包，配置文件：

- `electron-builder.yml` - 主要构建配置
- `dev-app-update.yml` - 开发环境更新配置

## 🔧 配置文件说明

| 文件 | 说明 |
|------|------|
| `components.json` | shadcn/ui 组件配置 |
| `electron.vite.config.ts` | Electron + Vite 构建配置 |
| `tailwind.config.js` | Tailwind CSS 配置 |
| `tsconfig.json` | TypeScript 主配置 |
| `eslint.config.mjs` | ESLint 代码规范配置 |

## 🎨 自定义主题

项目支持完全自定义的主题系统：

```css
/* 在 src/renderer/src/styles/main.css 中自定义 */
:root {
  /* 自定义颜色 */
  --primary: your-color;
  --background: your-background;
  
  /* 自定义圆角 */
  --radius: 0.5rem;
}
```

## 🚀 性能优化

- **Tree Shaking** - Vite 自动移除未使用的代码
- **代码分割** - 动态导入实现按需加载
- **资源优化** - 图片和字体资源自动优化
- **缓存策略** - 开发和生产环境的智能缓存

## 🤝 贡献指南

1. Fork 本项目
2. 创建特性分支：`git checkout -b feature/AmazingFeature`
3. 提交更改：`git commit -m 'Add some AmazingFeature'`
4. 推送到分支：`git push origin feature/AmazingFeature`
5. 打开 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙏 致谢

- [Electron](https://www.electronjs.org/) - 跨平台桌面应用框架
- [Vite](https://vitejs.dev/) - 下一代前端构建工具
- [shadcn/ui](https://ui.shadcn.com/) - 现代化组件库
- [Tailwind CSS](https://tailwindcss.com/) - 实用优先的 CSS 框架
- [Framer Motion](https://www.framer.com/motion/) - React 动画库

---

<div align="center">

**🌟 如果这个项目对你有帮助，请给它一个 Star！**

使用 ❤️ 和前沿技术构建

</div>