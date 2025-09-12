import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Minus, Square, X, Copy, Monitor } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface TitleBarProps {
  title?: string
  embedded?: boolean
  showLogo?: boolean
}

export default function TitleBar({ title = '现代化桌面应用开发框架', embedded = true }: TitleBarProps) {
  const [isMaximized, setIsMaximized] = useState(false)
  // 防抖计时器，避免状态频繁切换导致的多次渲染
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {

    const checkMaximized = async () => {
      if (window.api?.window?.isMaximized) {
        const maximized = await window.api.window.isMaximized()
        setIsMaximized((prev) => (prev !== maximized ? maximized : prev))
      }
    }
    
    checkMaximized()

    // 订阅主进程的最大化状态变更（包括拖拽触发的还原/最大化）
    let unsubscribe: (() => void) | undefined
    if (window.api?.window?.onMaximizeChanged) {
      unsubscribe = window.api.window.onMaximizeChanged((state: boolean) => {
        if (debounceRef.current) clearTimeout(debounceRef.current)
        debounceRef.current = setTimeout(() => {
          setIsMaximized((prev) => (prev !== state ? state : prev))
        }, 120)
      })
    }

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
      if (unsubscribe) unsubscribe()
    }
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
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={
        embedded
          ? 'z-10 flex items-center justify-between h-10 bg-transparent select-none'
          : 'fixed top-0 left-0 right-0 z-50 flex items-center justify之间 h-10 bg-transparent select-none'
      }
    >
      {/* 左侧 - Logo 和标题 (可拖拽区域) */}
      <div 
        className="flex items-center gap-2 px-3 flex-1"
        style={{ WebkitAppRegion: 'drag' } as any}
      >
        <span className="w-5 h-5 inline-flex items-center justify-center rounded-md">
          <Monitor className="w-4 h-4 text-foreground/80" />
        </span>
        <span className="text-sm font-medium text-foreground truncate max-w-[300px]">
          现代化桌面应用框架
        </span>
      </div>

      {/* 右侧 - 窗口控制按钮 (非拖拽区域) */}
      <div 
        className="flex items-center gap-1 px-1 py-1" 
        style={{ WebkitAppRegion: 'no-drag' } as any}
      >
        {/* 最小化按钮 */}
        <Button
          variant="ghost"
          size="sm"
          aria-label="Minimize"
          className="h-8 w-8 p-1.5 rounded-md text-foreground/70 hover:text-foreground hover:bg-gray-500/20 transition-colors"
          onClick={handleMinimize}
        >
          <Minus className="w-4 h-4" />
        </Button>

        {/* 最大化/还原按钮 */}
        <Button
          variant="ghost"
          size="sm"
          aria-label="Maximize"
          className="h-8 w-8 p-1.5 rounded-md text-foreground/70 hover:text-foreground hover:bg-gray-500/20 transition-colors"
          onClick={handleMaximize}
          title={isMaximized ? '还原窗口' : '最大化窗口'}
        >
          {isMaximized ? (
            // 复制图标表示“已最大化”状态，这里做水平翻转以符合视觉期望
            <Copy className="w-4 h-4" style={{ transform: 'scaleX(-1)' }} />
          ) : (
            <Square className="w-4 h-4" />
          )}
        </Button>

        {/* 关闭按钮 */}
        <Button
          variant="ghost"
          size="sm"
          aria-label="Close"
          className="h-8 w-8 p-1.5 rounded-md text-foreground/70 hover:text-white hover:bg-red-600/70 transition-colors"
          onClick={handleClose}
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
    </motion.div>
  )
}