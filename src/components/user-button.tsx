'use client';

import React, { useState } from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { User2 } from 'lucide-react';
import AccountDialog from './account-dialog';
import { useSession } from '@/hooks';
import Link from 'next/link';
import { signOut } from '@/app/(auth)/actions';

const UserButton = () => {
    const { user } = useSession();
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    if (!user) return (
        <Button variant="ghost" asChild>
            <Link href="/sign-in">Sign In</Link>
        </Button>
    )

    return (
        <div className="relative">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center space-x-2">
                        <User2 className="w-6 h-6" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    align="end"
                    className="w-64 p-2 rounded-lg shadow-md border"
                >
                    <div className="flex items-center space-x-3 p-2 border-b">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center">
                            <User2 className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm font-medium">{user.name}</p>
                            <p className="text-sm">{user.email}</p>
                        </div>
                    </div>
                    <DropdownMenuItem
                        onClick={() => setIsDialogOpen(true)}
                        className="flex items-center space-x-2 p-2 rounded-lg cursor-pointer"
                    >
                        Manage account
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={signOut}
                        className="flex items-center space-x-2 p-2 rounded-lg cursor-pointer"
                    >
                        Sign out
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <AccountDialog
                isDialogOpen={isDialogOpen}
                setIsDialogOpen={setIsDialogOpen}
            />
        </div>
    );
};

export default UserButton;
