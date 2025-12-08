import AppRoutes from '@/routes'
import { Toaster } from 'sonner'

export default function App(): React.JSX.Element {
  return (
    <>
      <AppRoutes />
      <Toaster position="top-center" richColors closeButton />
    </>
  )
}


