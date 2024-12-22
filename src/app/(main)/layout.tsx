import Navbar from '@/components/navbar'
import PremiumModal from '@/components/premium-modal'
import React from 'react'

const layout = (
    { children }: { children: React.ReactNode }
) => {
    return (
        <div className="flex min-h-dvh flex-col">
            {children}
            <PremiumModal />
        </div>
    )
}

export default layout
