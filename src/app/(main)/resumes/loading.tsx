import Navbar from '@/components/navbar';
import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

const loading = () => {
    return (
        <main className="mx-auto w-full max-w-7xl space-y-6 px-3 py-6">
            <Skeleton className="ml-auto flex w-[100px] h-10 rounded-lg" />

            <div className="space-y-1">
                <Skeleton className="text-3xl font-bold h-8 w-1/4 rounded-lg" />
                <Skeleton className="h-5 w-1/12 rounded-lg" />
            </div>

            <div className="grid w-full grid-cols-2 gap-3 sm:grid md:grid-cols-3 lg:grid-cols-4">
                {[...Array(3)].map((_, index) => (
                    <div
                        key={index}
                        className="group relative rounded-lg border border-transparent bg-secondary p-3 transition-colors hover:border-border"
                    >
                        <div className="space-y-3">
                            <div className="space-y-1 flex flex-col items-center">
                                <Skeleton className="h-6 w-1/2 rounded-lg" />
                                <Skeleton className="h-4 w-3/4 rounded-lg" />
                            </div>
                            <div className="relative inline-block w-full">
                                <Skeleton className="h-96 w-full rounded-lg" />
                                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
};

export default loading;
