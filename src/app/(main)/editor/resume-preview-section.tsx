"use client"
import ResumePreview from '@/components/resume-preview';
import { Button } from '@/components/ui/button';
import { ResumeValues } from '@/lib/schema.zod';
import { cn } from '@/lib/utils';
import React, { useRef } from 'react'
import { useReactToPrint } from 'react-to-print';

interface ResumePreviewSectionProps {
    className?: string;
    resumeData: ResumeValues;
}

const ResumePreviewSection: React.FC<ResumePreviewSectionProps> = ({
    className,
    resumeData
}) => {
    const contentRef = useRef<HTMLDivElement>(null);

    const reactToPrintFn = useReactToPrint({
        contentRef: contentRef as any,
        documentTitle: resumeData.title || "Resume",
    });
    const printPdf = async (s: number) => {
        const u = s ? '/api/resume' : '/api/generate-pdf';
        const pdfBlob = await fetch(u, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ resumeData }),
        }).then(res => res.blob());
        const url = URL.createObjectURL(pdfBlob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'resume.pdf';
        a.click();
    }


    return (
        <div className={cn("group relative hidden w-full md:flex md:w-1/2 flex-col", className)}>
            <div className="flex gap-3">
                <Button onClick={() => reactToPrintFn()}>Print</Button>
                <Button onClick={() => printPdf(1)}>Resume</Button>
                <Button onClick={() => printPdf(0)}>Generate</Button>
            </div>
            <div className="flex w-full justify-center overflow-y-auto bg-secondary p-3">
                <ResumePreview
                    resumeData={resumeData}
                    className="max-w-2xl shadow-md"
                    contentRef={contentRef}
                />
            </div>
        </div>
    )
}

export default ResumePreviewSection
