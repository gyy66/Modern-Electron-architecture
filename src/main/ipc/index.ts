import { registerWindowHandlers } from './handlers/window-handlers'

export function registerIpcHandlers(): void {
  registerWindowHandlers()
  // 这里可以注册其他模块的IPC处理器
  // registerAuthHandlers()
  // registerAccountHandlers()
  // registerContentHandlers()
  // registerPublishHandlers()
}