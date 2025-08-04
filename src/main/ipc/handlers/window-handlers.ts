import { ipcMain, shell } from 'electron'
import { windowManager } from '../../app/window-manager'

export function registerWindowHandlers(): void {
  // 最小化窗口
  ipcMain.handle('window-minimize', () => {
    windowManager.minimizeWindow()
  })

  // 最大化/还原窗口
  ipcMain.handle('window-maximize', () => {
    windowManager.maximizeWindow()
    return windowManager.isMaximized()
  })

  // 关闭窗口
  ipcMain.handle('window-close', () => {
    windowManager.closeWindow()
  })

  // 获取窗口最大化状态
  ipcMain.handle('window-is-maximized', () => {
    return windowManager.isMaximized()
  })

  // 打开外部链接
  ipcMain.on('open-external', (_, url: string) => {
    shell.openExternal(url)
  })

  // 测试 IPC 通信
  ipcMain.on('ping', () => {
    console.log('pong')
  })
}