import { BrowserWindow } from 'electron'
import { join } from 'path'
import { is } from '@electron-toolkit/utils'
import icon from '../../../resources/icon.png?asset'

export class WindowManager {
  private mainWindow: BrowserWindow | null = null

  createMainWindow(): BrowserWindow {
    // 创建浏览器窗口
    this.mainWindow = new BrowserWindow({
      width: 1200,
      height: 800,
      minWidth: 800,
      minHeight: 600,
      show: false,
      frame: false, // 移除默认标题栏
      autoHideMenuBar: true,
      ...(process.platform === 'linux' ? { icon } : {}),
      webPreferences: {
        preload: join(__dirname, '../preload/index.js'),
        sandbox: false,
        contextIsolation: true
      }
    })

    this.mainWindow.on('ready-to-show', () => {
      console.log('窗口准备显示')
      if (this.mainWindow) {
        this.mainWindow.show()
        if (is.dev) {
          this.mainWindow.webContents.openDevTools()
        }
      }
    })

    // 同步最大化状态变更到渲染进程（包括拖拽导致的还原/最大化）
    this.mainWindow.on('maximize', () => {
      try {
        this.mainWindow?.webContents.send('window-maximize-changed', true)
      } catch {}
    })
    this.mainWindow.on('unmaximize', () => {
      try {
        this.mainWindow?.webContents.send('window-maximize-changed', false)
      } catch {}
    })

    // 添加错误处理
    this.mainWindow.webContents.on('did-fail-load', (event, errorCode, errorDescription) => {
      console.error('页面加载失败:', errorCode, errorDescription)
    })

    this.mainWindow.webContents.on('did-finish-load', () => {
      console.log('页面加载完成')
    })

    this.mainWindow.webContents.setWindowOpenHandler((details) => {
      const { shell } = require('electron')
      shell.openExternal(details.url)
      return { action: 'deny' }
    })

    // 基于 electron-vite cli 的渲染进程热重载
    // 开发环境加载远程 URL，生产环境加载本地 html 文件
    if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
      this.mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
    } else {
      this.mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
    }

    return this.mainWindow
  }

  getMainWindow(): BrowserWindow | null {
    return this.mainWindow
  }

  minimizeWindow(): void {
    if (this.mainWindow && !this.mainWindow.isDestroyed()) {
      this.mainWindow.minimize()
    }
  }

  maximizeWindow(): void {
    if (this.mainWindow && !this.mainWindow.isDestroyed()) {
      if (this.mainWindow.isMaximized()) {
        this.mainWindow.unmaximize()
      } else {
        this.mainWindow.maximize()
      }
    }
  }

  closeWindow(): void {
    if (this.mainWindow && !this.mainWindow.isDestroyed()) {
      this.mainWindow.close()
    }
  }

  isMaximized(): boolean {
    if (this.mainWindow && !this.mainWindow.isDestroyed()) {
      return this.mainWindow.isMaximized()
    }
    return false
  }
}

export const windowManager = new WindowManager()