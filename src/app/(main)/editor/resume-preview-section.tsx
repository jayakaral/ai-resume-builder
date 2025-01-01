"use client"
import ResumePreview from '@/components/resume-preview';
import { Button } from '@/components/ui/button';
import { ResumeValues } from '@/lib/schema.zod';
import { cn } from '@/lib/utils';
import React, { useRef } from 'react';
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

    const handlePrint = useReactToPrint({
        contentRef: contentRef as any,
        documentTitle: resumeData.title || "Resume",
    });

    const handleDownloadPdf = async () => {
        const html2canvas = (await import('html2canvas')).default;
        const jsPDF = (await import('jspdf')).default;

        if (!contentRef.current) return;
        contentRef.current.style.zoom = '1';

        const content = contentRef.current;
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'px',
            format: 'a4',
        });

        const canvas = await html2canvas(content, { scale: 2 });
        const imgData = canvas.toDataURL('image/png');

        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        const imgWidth = canvas.width / 4.2; // Adjust scale for A4
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        if (imgHeight > pageHeight) {
            const totalPages = Math.ceil(imgHeight / pageHeight);

            for (let i = 0; i < totalPages; i++) {
                const yOffset = -(pageHeight * i);
                pdf.addImage(imgData, 'PNG', 0, yOffset, pageWidth, imgHeight);

                if (i < totalPages - 1) {
                    pdf.addPage();
                }
            }
        } else {
            pdf.addImage(imgData, 'PNG', 0, 0, pageWidth, imgHeight);
        }

        pdf.save(`${resumeData.title || "Resume"}.pdf`);
    };


    return (
        <div className={cn("group relative hidden w-full md:flex md:w-1/2 flex-col", className)}>
            <div className="gap-3 flex py-1 items-center justify-center">
                <Button onClick={() => handlePrint()}>Print</Button>
                {/* <Button onClick={handleDownloadPdf}>Download PDF</Button> */}
            </div>
            <div className="flex w-full justify-center overflow-y-auto bg-secondary p-3">
                <ResumePreview
                    resumeData={resumeData}
                    className="max-w-2xl shadow-md"
                    contentRef={contentRef}
                />
            </div>
        </div>
    );
};

export default ResumePreviewSection;
