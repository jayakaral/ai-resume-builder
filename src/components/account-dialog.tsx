import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from './ui/dialog';

interface AccountDialogProps {
    isDialogOpen: boolean;
    setIsDialogOpen: (isOpen: boolean) => void;
}

const AccountDialog = ({
    isDialogOpen,
    setIsDialogOpen,
}: AccountDialogProps) => {
    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="max-w-3xl p-6 rounded-lg shadow-lg min-h-[75dvh]">
                <DialogHeader className="hidden">
                    <DialogTitle>Account</DialogTitle>
                </DialogHeader>

                <div className="flex divide-x">
                    {/* Sidebar */}
                    <div className="w-1/4 pr-4">
                        <div className='mb-6'>
                            <h2 className='font-semibold text-xl'>Account</h2>
                            <p className='text-xs'>manage your account info</p>
                        </div>
                        <ul className="space-y-2">
                            <li className="font-medium cursor-pointer">Profile</li>
                            <li className="font-medium cursor-pointer">Security</li>
                        </ul>
                    </div>

                    {/* Main Content */}
                    <div className="grow px-6 *:py-5 divide-y">
                        <h2 className="text-xl !pt-2 font-semibold">Profile details</h2>

                        <div className="flex items-center">
                            {/* Profile Icon */}
                            <div className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-semibold">
                                U
                            </div>

                            {/* Profile Name and Update Button */}
                            <div className="ml-4">
                                <p className="text-sm font-medium">Unknown Person</p>
                                <button className="text-sm text-blue-500 hover:underline">Update profile</button>
                            </div>
                        </div>

                        {/* Email Section */}
                        <div className="space-y-1">
                            <p className="text-sm font-medium">Email addresses</p>
                            <p className="text-sm">up8560001@gmail.com <span className="text-xs">(Primary)</span></p>
                            <button className="text-sm hover:underline">+ Add email address</button>
                        </div>

                        {/* Connected Accounts */}
                        <div>
                            <p className="text-sm font-medium mb-2">Connected accounts</p>
                            <div className="flex items-center">
                                <div className="w-8 h-8 rounded-full flex items-center justify-center">
                                    G
                                </div>
                                <p className="text-sm">Google - up8560001@gmail.com</p>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default AccountDialog;
