import Navbar from '@/components/navbar'
import React from 'react'

const layout = (
    { children }: { children: React.ReactNode }
) => {
    return (
        <div className="flex min-h-dvh flex-col overflow-hidden">
            <Navbar />
            {children}
        </div>
    )
}

export default layout
