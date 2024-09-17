'use client'

import { usePathname } from 'next/navigation'
import Header from '@/components/ui/header'

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {!pathname.includes('/dashboard') && <Header />}
      {children}
    </div>
  )
}
