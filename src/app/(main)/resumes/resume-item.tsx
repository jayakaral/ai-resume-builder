"use client";

import LoadingButton from "@/components/loading-button";
import ResumePreview from "@/components/resume-preview";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks";
import { ResumePrismaVal } from "@/lib/types";
import { mapToValues } from "@/lib/utils";
import { formatDate } from "date-fns";
import { MoreVertical, Printer, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRef, useState, useTransition } from "react";
import { useReactToPrint } from "react-to-print";
import { deleteResume } from "./actions";

interface ResumeItemProps {
    resume: ResumePrismaVal;
}

export default function ResumeItem({ resume }: ResumeItemProps) {
    const wasUpdated = resume.updatedAt !== resume.createdAt;

    const contentRef = useRef(null);

    const reactToPrintFn = useReactToPrint({
        contentRef: contentRef as any,
        documentTitle: resume.title || "Resume",
    });

    return (
        <div className="group relative rounded-lg border border-transparent bg-secondary p-3 transition-colors hover:border-border">
            <div className="space-y-3">
                <Link
                    href={`/editor?resumeId=${resume.id}`}
                    className="inline-block w-full text-center"
                >
                    <p className="line-clamp-1 font-semibold">
                        {resume.title || "No title"}
                    </p>
                    {resume.description && (
                        <p className="line-clamp-2 text-sm">{resume.description}</p>
                    )}
                    <p className="text-xs text-muted-foreground">
                        {wasUpdated ? "Updated" : "Created"} on{" "}
                        {formatDate(resume.updatedAt, "MMM d, yyyy h:mm a")}
                    </p>
                </Link>
                <Link
                    href={`/editor?resumeId=${resume.id}`}
                    className="relative inline-block w-full"
                >
                    <ResumePreview
                        contentRef={contentRef}
                        resumeData={mapToValues(resume)}
                        className="overflow-hidden shadow-sm transition-shadow group-hover:shadow-lg"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent" />
                </Link>
            </div>
            <MoreMenu resumeId={resume.id} onPrintClick={reactToPrintFn} />
        </div>
    );
}

interface MoreMenuProps {
    resumeId: string;
    onPrintClick: () => void;
}

function MoreMenu({ resumeId, onPrintClick }: MoreMenuProps) {
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-0.5 top-0.5 opacity-0 transition-opacity group-hover:opacity-100"
                    >
                        <MoreVertical className="size-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem
                        className="flex items-center gap-2"
                        onClick={() => setShowDeleteConfirmation(true)}
                    >
                        <Trash2 className="size-4" />
                        Delete
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        className="flex items-center gap-2"
                        onClick={onPrintClick}
                    >
                        <Printer className="size-4" />
                        Print
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <DeleteConfirmationDialog
                resumeId={resumeId}
                open={showDeleteConfirmation}
                setOpen={setShowDeleteConfirmation}
            />
        </>
    );
}

interface DeleteConfirmationDialogProps {
    resumeId: string;
    open: boolean;
    setOpen: (open: boolean) => void;
}

function DeleteConfirmationDialog({
    resumeId,
    open,
    setOpen,
}: DeleteConfirmationDialogProps) {
    const { toast } = useToast();

    const [isPending, startTransition] = useTransition();

    async function handleDelete() {
        startTransition(async () => {
            try {
                await deleteResume(resumeId);
                setOpen(false);
            } catch (error) {
                console.error(error);
                toast({
                    variant: "destructive",
                    description: "Something went wrong. Please try again.",
                });
            }
        });
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Delete resume?</DialogTitle>
                    <DialogDescription>
                        This will permanently delete this resume. This action cannot be
                        undone.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <LoadingButton
                        variant="destructive"
                        onClick={handleDelete}
                        loading={isPending}
                    >
                        Delete
                    </LoadingButton>
                    <Button variant="secondary" onClick={() => setOpen(false)}>
                        Cancel
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
