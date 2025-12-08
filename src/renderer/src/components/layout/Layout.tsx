import React from 'react'
import TitleBar from './TitleBar'
import { Sidebar, SidebarBody, SidebarLink, SidebarLinkItem } from './Sidebar'
import { LayoutDashboard, UserCog, Settings as SettingsIcon } from 'lucide-react'

export interface LayoutProps {
  children?: React.ReactNode
  links?: SidebarLinkItem[]
}

export default function Layout({ children, links }: LayoutProps) {
  const defaultLinks: SidebarLinkItem[] = [
    {
      label: '首页',
      href: '#/dashboard',
      icon: <LayoutDashboard className="h-5 w-5 flex-shrink-0" />
    },
    {
      label: '账号',
      href: '#/accounts',
      icon: <UserCog className="h-5 w-5 flex-shrink-0" />
    },
    {
      label: '设置',
      href: '#/settings',
      icon: <SettingsIcon className="h-5 w-5 flex-shrink-0" />
    },
    
  ]

  const renderedLinks = links && links.length > 0 ? links : defaultLinks

  return (
    <div className="min-h-screen text-foreground">
      {/* 顶部自定义标题栏：背景透明，沿用全局背景 */}
      <div style={{ WebkitAppRegion: 'drag' } as any}>
        <TitleBar embedded={true} />
      </div>

      {/* 下面区域：左侧侧边栏 + 右侧主内容区 */}
      <div className="flex h-[calc(100vh-2.5rem)]">
        <Sidebar>
          <SidebarBody className="justify-between gap-6">
            <div className="flex flex-col flex-1 overflow-y-auto overflow-x-visible">
              <div className="flex flex-col gap-1">
                {renderedLinks.map((link) => (
                  <SidebarLink key={link.label} link={link} />
                ))}
              </div>
            </div>
          </SidebarBody>
        </Sidebar>

        {/* 主内容区域：右侧卡片容器（右、下间距；圆角） */}
        <main className="flex-1 min-w-0 overflow-auto pr-3 pb-3 box-border">
          <div className="h-full w-full rounded-xl border border-border/60 bg-white/70 backdrop-blur-sm">
            <div className="h-full w-full p-4 md:p-6 lg:p-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}


