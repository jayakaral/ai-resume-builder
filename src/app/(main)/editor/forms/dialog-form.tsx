import React, { FC } from 'react'
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';

interface DialogFormProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    index: number;
    children: React.ReactNode;
    onSubmit: () => void;
}

const DialogForm: FC<DialogFormProps> = ({
    isOpen,
    setIsOpen,
    index,
    children,
    onSubmit
}) => {
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Experience {index + 1}</DialogTitle>
                </DialogHeader>

                {children}

                <DialogFooter>
                    <Button variant="secondary" onClick={() => setIsOpen(false)}>
                        Cancel
                    </Button>
                    <Button onClick={onSubmit}>
                        Add
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default DialogForm
