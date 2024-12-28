import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const loading = () => {
    return (
        <div className="flex grow flex-col noscrollbar">
            <header className='flex flex-col items-center px-3 py-4 border-b space-y-1'>
                <Skeleton className="h-8 w-80 rounded-lg" />
                <Skeleton className="h-4 w-1/4 rounded-lg" />
            </header>

            <main className="relative grow">
                <div className="absolute bottom-0 top-0 flex w-full divide-x">
                    <div className="left w-1/2 space-y-6 overflow-y-auto p-3">
                        <div className="mx-auto max-w-xl space-y-6">
                            <Skeleton className="w-full h-4 rounded-sm" />
                            <div className="space-y-3 my-4 flex flex-col items-center">
                                <Skeleton className="h-6 w-1/2 rounded-lg" />
                                <Skeleton className="h-4 w-3/4 rounded-lg" />
                            </div>
                            <div className="space-y-2">
                                <Skeleton className="w-32 h-3 rounded-sm" />
                                <Skeleton className="w-full h-10 rounded-lg" />
                            </div>
                            <div className="space-y-2">
                                <Skeleton className="w-32 h-3 rounded-sm" />
                                <Skeleton className="w-full h-10 rounded-lg" />
                            </div>
                            <div className="space-y-2">
                                <Skeleton className="w-32 h-3 rounded-sm" />
                                <Skeleton className="w-full h-10 rounded-lg" />
                            </div>
                            <div className="space-y-2">
                                <Skeleton className="w-32 h-3 rounded-sm" />
                                <Skeleton className="w-full h-10 rounded-lg" />
                            </div>
                            <div className="space-y-2">
                                <Skeleton className="w-32 h-3 rounded-sm" />
                                <Skeleton className="w-full h-10 rounded-lg" />
                            </div>
                        </div>
                    </div>
                    <div className={"group relative hidden w-full md:flex md:w-1/2 flex-col"}>
                        <div className="flex w-full justify-center flex-1 bg-secondary p-3">
                            <Skeleton className="aspect-[210/297] h-full bg-white text-black" />
                        </div>
                    </div>
                </div>
            </main>

            <footer className='w-full border-t px-3 py-4 select-none'>
                <div className="flex max-w-7xl mx-auto gap-3 justify-between flex-wrap">
                    <div className="flex items-center gap-3">
                        <Skeleton className="w-[100px] h-10 rounded-lg" />
                        <Skeleton className="w-[100px] h-10 rounded-lg" />
                    </div>
                    <Skeleton className="w-[50px] h-10 rounded-lg" />
                    <div className="flex items-center gap-3">
                        <Skeleton className="w-[50px] h-10 rounded-lg" />
                        <Skeleton className="w-[100px] h-10 rounded-lg" />
                    </div>

                </div>

            </footer>
        </div>
    )
}

export default loading
