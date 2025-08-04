import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Minus, Square, X, Monitor, Copy } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface TitleBarProps {
  title?: string
}

export default function TitleBar({ title = '现代化桌面应用开发框架' }: TitleBarProps) {
  const [isMaximized, setIsMaximized] = useState(false)

  useEffect(() => {
    const checkMaximized = async () => {
      if (window.api?.window?.isMaximized) {
        const maximized = await window.api.window.isMaximized()
        setIsMaximized(maximized)
      }
    }
    
    checkMaximized()
  }, [])

  const handleMinimize = async () => {
    if (window.api?.window?.minimize) {
      await window.api.window.minimize()
    }
  }

  const handleMaximize = async () => {
    if (window.api?.window?.maximize) {
      const maximized = await window.api.window.maximize()
      setIsMaximized(maximized)
    }
  }

  const handleClose = async () => {
    if (window.api?.window?.close) {
      await window.api.window.close()
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative z-50 flex items-center justify-between h-10 bg-slate-900/95 backdrop-blur-sm border-b border-slate-700/50 select-none"
    >
      {/* 左侧 - Logo 和标题 (可拖拽区域) */}
      <div 
        className="flex items-center gap-3 px-4 flex-1"
        style={{ WebkitAppRegion: 'drag' } as any}
      >
        <div className="w-5 h-5 bg-gradient-to-br from-blue-500 to-purple-600 rounded-md flex items-center justify-center">
          <Monitor className="w-3 h-3 text-white" />
        </div>
        <span className="text-sm font-medium text-slate-200 truncate max-w-[300px]">
          {title}
        </span>
      </div>

      {/* 右侧 - 窗口控制按钮 (非拖拽区域) */}
      <div 
        className="flex items-center" 
        style={{ WebkitAppRegion: 'no-drag' } as any}
      >
        {/* 最小化按钮 */}
        <Button
          variant="ghost"
          size="sm"
          className="h-10 w-10 rounded-none hover:bg-slate-700/50 text-slate-400 hover:text-slate-200 transition-colors"
          onClick={handleMinimize}
        >
          <Minus className="w-4 h-4" />
        </Button>

        {/* 最大化/还原按钮 */}
        <Button
          variant="ghost"
          size="sm"
          className="h-10 w-10 rounded-none hover:bg-slate-700/50 text-slate-400 hover:text-slate-200 transition-colors"
          onClick={handleMaximize}
          title={isMaximized ? '还原窗口' : '最大化窗口'}
        >
          {isMaximized ? (
            <Copy className="w-4 h-4" />
          ) : (
            <Square className="w-4 h-4" />
          )}
        </Button>

        {/* 关闭按钮 */}
        <Button
          variant="ghost"
          size="sm"
          className="h-10 w-10 rounded-none hover:bg-red-600 text-slate-400 hover:text-white transition-colors"
          onClick={handleClose}
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
    </motion.div>
  )
}