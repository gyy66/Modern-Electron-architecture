import React from 'react'
import Layout from '@/components/layout/Layout'
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'

const Dashboard = React.lazy(() => import('@/pages/Dashboard/index'))
const Accounts = React.lazy(() => import('@/pages/Accounts/index'))
const Settings = React.lazy(() => import('@/pages/Settings/index'))

export default function AppRoutes() {
  return (
    <HashRouter>
      <Layout>
        <React.Suspense fallback={<div className="p-6 text-slate-500">Loading...</div>}>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/accounts" element={<Accounts />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </React.Suspense>
      </Layout>
    </HashRouter>
  )
}


