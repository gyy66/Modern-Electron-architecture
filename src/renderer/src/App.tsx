import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card'
import { Badge } from './components/ui/badge'
import { Button } from './components/ui/button'
import { Separator } from './components/ui/separator'
import { Progress } from './components/ui/progress'
import TitleBar from './components/layout/TitleBar'
import { 
  Code2, 
  Layers, 
  Zap, 
  Palette, 
  GitBranch,
  Monitor,
  Cpu,
  Settings,
  ExternalLink
} from 'lucide-react'

function App(): React.JSX.Element {
  const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')
  
  const openExternalLink = (url: string) => {
    if (window.electron?.ipcRenderer) {
      window.electron.ipcRenderer.send('open-external', url)
    }
  }

  const techStack = [
    { 
      name: 'Electron 28+', 
      category: '桌面框架', 
      progress: 100, 
      color: 'bg-blue-500',
      url: 'https://www.electronjs.org/',
      description: '使用 JavaScript, HTML 和 CSS 构建跨平台的桌面应用'
    },
    { 
      name: 'Vite 5+', 
      category: '构建工具', 
      progress: 100, 
      color: 'bg-purple-500',
      url: 'https://vitejs.dev/',
      description: '下一代前端构建工具，提供极速的开发体验'
    },
    { 
      name: 'shadcn/ui', 
      category: 'UI组件', 
      progress: 100, 
      color: 'bg-slate-500',
      url: 'https://ui.shadcn.com/',
      description: '设计精美、可访问、可定制的组件库'
    },
    { 
      name: 'Tailwind CSS v4', 
      category: '样式框架', 
      progress: 100, 
      color: 'bg-teal-500',
      url: 'https://tailwindcss.com/',
      description: '实用优先的 CSS 框架，快速构建现代网站'
    },
    { 
      name: 'Framer Motion', 
      category: '动画库', 
      progress: 100, 
      color: 'bg-pink-500',
      url: 'https://www.framer.com/motion/',
      description: '为 React 而生的生产就绪动画和手势库'
    },
    { 
      name: 'TypeScript 5+', 
      category: '类型系统', 
      progress: 100, 
      color: 'bg-blue-600',
      url: 'https://www.typescriptlang.org/',
      description: '带有类型语法的 JavaScript 超集'
    }
  ]

  const features = [
    { name: '模块化架构', icon: <Layers className="w-5 h-5 text-blue-400" />, status: '已集成' },
    { name: '类型安全', icon: <Settings className="w-5 h-5 text-green-400" />, status: '已集成' },
    { name: '热重载开发', icon: <Zap className="w-5 h-5 text-yellow-400" />, status: '已集成' },
    { name: '现代化UI', icon: <Palette className="w-5 h-5 text-purple-400" />, status: '已集成' },
    { name: 'IPC通信', icon: <GitBranch className="w-5 h-5 text-teal-400" />, status: '已集成' }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-auto">
      {/* 自定义标题栏 */}
      <TitleBar />
      
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent)] pointer-events-none" />
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <motion.div 
        className="relative z-10 container mx-auto px-6 py-8 pt-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div className="text-center mb-12" variants={itemVariants}>
          <div className="flex items-center justify-center mb-6">
            <motion.div 
              className="relative"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4 shadow-2xl">
                <Monitor className="w-10 h-10 text-white" />
              </div>
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-1000" />
            </motion.div>
          </div>
          
          <motion.h1 
            className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent mb-4"
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.8 }}
          >
            现代化桌面应用开发框架
          </motion.h1>
          
          <motion.p 
            className="text-xl text-slate-300 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            基于 Electron + Vite + shadcn/ui + Tailwind CSS + Framer Motion 构建的下一代开发模板
          </motion.p>
        </motion.div>

        {/* Tech Stack Grid */}
        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12" variants={itemVariants}>
          {techStack.map((tech, index) => (
            <motion.div
              key={tech.name}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300 group">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white text-lg">{tech.name}</CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="bg-slate-700 text-slate-200">
                        {tech.category}
                      </Badge>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-slate-700"
                        onClick={() => openExternalLink(tech.url)}
                      >
                        <ExternalLink className="w-4 h-4 text-slate-400 hover:text-blue-400" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm text-slate-400 mt-2">{tech.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Progress 
                      value={tech.progress} 
                      className="h-2"
                    />
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-400">集成度</span>
                      <span className="text-green-400 font-medium">{tech.progress}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Architecture Overview */}
        <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12" variants={itemVariants}>
          {/* File Structure */}
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-blue-400" />
                项目架构
              </CardTitle>
              <CardDescription className="text-slate-400">
                模块化设计，关注点清晰分离
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="font-mono text-sm text-slate-300 space-y-1">
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-yellow-400" />
                  <span className="text-white">src/main/</span>
                  <Badge variant="outline" className="text-xs text-white border-white">主进程</Badge>
                </div>
                <div className="ml-6 text-slate-400">
                  ├── modules/ <span className="text-green-400"># 功能模块</span><br/>
                  ├── ipc/ <span className="text-green-400"># IPC处理器</span><br/>
                  └── database/ <span className="text-green-400"># 数据层</span>
                </div>
                
                <div className="flex items-center gap-2 mt-4">
                  <Monitor className="w-4 h-4 text-blue-400" />
                  <span className="text-white">src/renderer/</span>
                  <Badge variant="outline" className="text-xs text-white border-white">渲染进程</Badge>
                </div>
                <div className="ml-6 text-slate-400">
                  ├── pages/ <span className="text-green-400"># 页面组件</span><br/>
                  ├── modules/ <span className="text-green-400"># 业务逻辑</span><br/>
                  └── components/ <span className="text-green-400"># 通用组件</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Framework Features */}
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Zap className="w-5 h-5 text-purple-400" />
                框架特性
              </CardTitle>
              <CardDescription className="text-slate-400">
                开箱即用的现代化功能
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.name}
                  className="flex items-center justify-between p-3 rounded-lg bg-slate-700/30 hover:bg-slate-700/50 transition-colors"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-center gap-3">
                    {feature.icon}
                    <span className="text-slate-200">{feature.name}</span>
                  </div>
                  <Badge variant="secondary" className="bg-green-900/50 text-green-400 border-green-700">
                    {feature.status}
                  </Badge>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Features Highlight */}
        <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12" variants={itemVariants}>
          <Card className="bg-gradient-to-br from-blue-900/50 to-blue-800/30 border-blue-700/50 backdrop-blur-sm group cursor-pointer"
                onClick={() => openExternalLink('https://ui.shadcn.com/docs')}>
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Palette className="w-5 h-5 text-blue-400" />
                  现代化UI
                </div>
                <ExternalLink className="w-4 h-4 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300 text-sm">
                基于 shadcn/ui 和 Tailwind CSS v4 构建，支持 OKLCH 色彩空间和流畅动画效果
              </p>
              <p className="text-blue-400 text-xs mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                点击了解 shadcn/ui 使用指南
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-900/50 to-purple-800/30 border-purple-700/50 backdrop-blur-sm group cursor-pointer"
                onClick={() => openExternalLink('https://vitejs.dev/guide/')}>
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-purple-400" />
                  极速构建
                </div>
                <ExternalLink className="w-4 h-4 text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300 text-sm">
                Vite 驱动的 5 倍构建速度提升，开发过程中享受即时热重载体验
              </p>
              <p className="text-purple-400 text-xs mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                点击了解 Vite 构建优化
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-teal-900/50 to-teal-800/30 border-teal-700/50 backdrop-blur-sm group cursor-pointer"
                onClick={() => openExternalLink('https://www.typescriptlang.org/docs/')}>
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Code2 className="w-5 h-5 text-teal-400" />
                  类型安全
                </div>
                <ExternalLink className="w-4 h-4 text-teal-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300 text-sm">
                主进程和渲染进程全面 TypeScript 支持，严格类型检查确保代码质量
              </p>
              <p className="text-teal-400 text-xs mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                点击学习 TypeScript 最佳实践
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <Separator className="my-8 bg-slate-700" />

        {/* Actions */}
        <motion.div 
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          variants={itemVariants}
        >
          <Button 
            onClick={ipcHandle}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
            size="lg"
          >
            <Zap className="w-5 h-5 mr-2" />
            测试 IPC 通信
          </Button>
          
          <Button 
            variant="outline" 
            className="border-slate-600 text-black hover:bg-slate-700 hover:text-white hover:border-slate-500 px-8 py-3 text-lg transition-all duration-300"
            size="lg"
          >
            <Settings className="w-5 h-5 mr-2" />
            打开开发者工具 (F12)
          </Button>
        </motion.div>

        {/* Footer */}
        <motion.div 
          className="text-center mt-12 text-slate-400"
          variants={itemVariants}
        >
          <p className="text-sm">
            使用 ❤️ 和前沿技术构建 • 
            <span className="text-blue-400 ml-1">Electron + Vite + shadcn/ui + Tailwind CSS + Framer Motion</span>
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default App
