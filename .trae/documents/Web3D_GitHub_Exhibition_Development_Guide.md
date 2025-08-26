# Web3D GitHub Exhibition - 开发指南

## 1. 开发环境配置

### 1.1 环境要求

* Node.js >= 18.0.0

* npm >= 8.0.0 或 yarn >= 1.22.0

* 现代浏览器（Chrome 90+, Firefox 88+, Safari 14+）

* Git

### 1.2 项目初始化

```bash
# 创建项目
npm create vite@latest github-gallery -- --template react-ts
cd github-gallery

# 安装依赖
npm install

# 安装Three.js相关依赖
npm install three @types/three @react-three/fiber @react-three/drei

# 安装其他核心依赖
npm install axios zustand react-router-dom
npm install -D tailwindcss postcss autoprefixer
npm install -D @types/node

# 初始化TailwindCSS
npx tailwindcss init -p
```

### 1.3 项目结构

```
src/
├── components/          # 可复用组件
│   ├── ui/             # 基础UI组件
│   ├── 3d/             # 3D相关组件
│   └── layout/         # 布局组件
├── pages/              # 页面组件
│   ├── Home.tsx
│   ├── Gallery.tsx
│   └── Error.tsx
├── hooks/              # 自定义Hooks
│   ├── useGitHubAPI.ts
│   ├── useLocalStorage.ts
│   └── use3DScene.ts
├── services/           # API服务
│   ├── github.ts
│   └── cache.ts
├── store/              # 状态管理
│   └── useAppStore.ts
├── types/              # TypeScript类型定义
│   ├── github.ts
│   ├── scene.ts
│   └── app.ts
├── utils/              # 工具函数
│   ├── constants.ts
│   ├── helpers.ts
│   └── validators.ts
├── assets/             # 静态资源
│   ├── models/
│   ├── textures/
│   └── sounds/
└── styles/             # 样式文件
    └── globals.css
```

## 2. 开发步骤

### 阶段一：基础架构搭建（第1-2周）

#### 2.1 项目配置

* [ ] 配置Vite构建工具

* [ ] 设置TypeScript配置

* [ ] 配置TailwindCSS

* [ ] 设置ESLint和Prettier

* [ ] 配置路由系统

#### 2.2 基础组件开发

* [ ] 创建Layout组件

* [ ] 开发Loading组件

* [ ] 创建Error Boundary

* [ ] 实现基础UI组件（Button, Input, Modal等）

#### 2.3 状态管理设置

* [ ] 配置Zustand store

* [ ] 定义应用状态接口

* [ ] 实现状态更新逻辑

### 阶段二：GitHub API集成（第3周）

#### 2.4 API服务开发

* [ ] 实现GitHub API客户端

* [ ] 添加错误处理和重试机制

* [ ] 实现数据缓存策略

* [ ] 创建API Hooks

#### 2.5 数据处理

* [ ] 实现用户数据获取

* [ ] 处理仓库列表数据

* [ ] 计算语言统计

* [ ] 数据验证和清洗

### 阶段三：3D场景开发（第4-5周）

#### 2.6 基础3D场景

* [ ] 初始化Three.js场景

* [ ] 创建展厅基础几何体

* [ ] 设置相机和光照

* [ ] 实现基础材质和纹理

#### 2.7 交互控制系统

* [ ] 实现WASD移动控制

* [ ] 添加鼠标视角控制

* [ ] 实现碰撞检测

* [ ] 优化控制响应性

#### 2.8 展板系统

* [ ] 创建项目展板组件

* [ ] 实现动态内容渲染

* [ ] 添加悬停和点击交互

* [ ] 优化展板布局算法

### 阶段四：数据可视化（第6周）

#### 2.9 3D图表开发

* [ ] 实现语言分布柱状图

* [ ] 创建交互式数据展示

* [ ] 添加动画效果

* [ ] 优化渲染性能

#### 2.10 用户界面完善

* [ ] 实现用户信息展示

* [ ] 添加操作提示界面

* [ ] 创建项目详情弹窗

* [ ] 完善响应式设计

### 阶段五：优化和测试（第7-8周）

#### 2.11 性能优化

* [ ] 实现代码分割

* [ ] 优化3D渲染性能

* [ ] 添加资源预加载

* [ ] 实现内存管理

#### 2.12 测试和调试

* [ ] 单元测试编写

* [ ] 集成测试

* [ ] 跨浏览器测试

* [ ] 性能测试

#### 2.13 部署准备

* [ ] 构建优化配置

* [ ] 环境变量配置

* [ ] 部署脚本编写

* [ ] 文档完善

## 3. 验收标准

### 3.1 功能验收

#### 基础功能

* [ ] 用户可以输入有效的GitHub用户名

* [ ] 系统能正确验证用户存在性

* [ ] 能够获取并显示用户基本信息

* [ ] 能够获取并展示用户的仓库列表

* [ ] 错误处理机制正常工作

#### 3D展厅功能

* [ ] 3D场景正确渲染

* [ ] WASD键移动控制正常

* [ ] 鼠标视角控制流畅

* [ ] 碰撞检测有效防止穿墙

* [ ] 项目展板正确显示仓库信息

* [ ] 数据可视化图表正确展示语言分布

#### 交互功能

* [ ] 点击展板能打开项目详情

* [ ] 详情弹窗显示完整仓库信息

* [ ] 外链跳转到GitHub页面正常

* [ ] 悬停效果和动画正常

### 3.2 性能验收

#### 加载性能

* [ ] 首屏加载时间 < 3秒

* [ ] 3D场景初始化时间 < 5秒

* [ ] API响应时间 < 2秒

* [ ] 页面切换流畅无卡顿

#### 运行性能

* [ ] 3D场景帧率稳定在30fps以上

* [ ] 内存使用合理，无明显泄漏

* [ ] CPU使用率在可接受范围

* [ ] 移动端性能可接受

### 3.3 兼容性验收

#### 浏览器兼容性

* [ ] Chrome 90+ 完全支持

* [ ] Firefox 88+ 完全支持

* [ ] Safari 14+ 基本支持

* [ ] Edge 90+ 完全支持

#### 设备兼容性

* [ ] 桌面端（1920x1080及以上）完美体验

* [ ] 笔记本（1366x768及以上）良好体验

* [ ] 平板设备基本可用

* [ ] 移动设备简化版本可用

### 3.4 用户体验验收

#### 易用性

* [ ] 操作直观，无需复杂学习

* [ ] 错误提示清晰友好

* [ ] 加载状态反馈及时

* [ ] 界面美观符合设计规范

#### 可访问性

* [ ] 支持键盘导航

* [ ] 颜色对比度符合标准

* [ ] 文字大小适中

* [ ] 支持基本的屏幕阅读器

## 4. 部署指南

### 4.1 构建配置

```javascript
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  build: {
    target: 'es2015',
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          three: ['three', '@react-three/fiber', '@react-three/drei'],
        },
      },
    },
  },
  optimizeDeps: {
    include: ['three'],
  },
})
```

### 4.2 环境变量配置

```bash
# .env.production
VITE_APP_TITLE=Web3D GitHub Exhibition
VITE_GITHUB_API_BASE=https://api.github.com
VITE_APP_VERSION=1.0.0
```

### 4.3 Vercel部署

```json
// vercel.json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

### 4.4 部署步骤

1. **代码准备**

   ```bash
   # 确保代码已提交到Git仓库
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **构建测试**

   ```bash
   # 本地构建测试
   npm run build
   npm run preview
   ```

3. **部署到Vercel**

   ```bash
   # 安装Vercel CLI
   npm i -g vercel

   # 登录并部署
   vercel login
   vercel --prod
   ```

4. **域名配置**

   * 在Vercel控制台配置自定义域名

   * 设置DNS记录

   * 配置HTTPS证书

## 5. 维护和监控

### 5.1 错误监控

* 集成Sentry进行错误追踪

* 设置关键指标监控

* 配置告警机制

### 5.2 性能监控

* 使用Web Vitals监控性能指标

* 定期进行性能审计

* 优化建议实施

### 5.3 更新维护

* 定期更新依赖包

* 关注GitHub API变更

* 用户反馈收集和处理

## 6. 故障排除

### 6.1 常见问题

**GitHub API限制**

* 问题：API请求频率限制

* 解决：实现请求缓存和限流

**3D性能问题**

* 问题：低端设备性能不佳

* 解决：实现性能分级和降级方案

**浏览器兼容性**

* 问题：某些浏览器不支持WebGL

* 解决：提供降级方案或友好提示

### 6.2 调试工具

* React Developer Tools

* Three.js Inspector

* Chrome DevTools Performance

* Network监控工具

