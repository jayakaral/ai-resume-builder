import React, { useRef } from "react";
import { cn } from '@/lib/utils';
import Template from "./template";
import { ResumeValues } from "@/lib/schema.zod";
import { useDimensions } from "@/hooks";


interface ResumePreviewProps {
    className?: string;
    contentRef?: React.Ref<HTMLDivElement>;
    resumeData: ResumeValues;
}
const ResumePreview: React.FC<ResumePreviewProps> = ({
    className,
    resumeData,
    contentRef,
}) => {
    const containerRef = useRef<HTMLDivElement>(null);

    const { width } = useDimensions(containerRef as any);

    // return (
    //     <PDFViewer showToolbar={false} className="w-full h-full">
    //         <Template2 />
    //     </PDFViewer>
    // )

    return (
        <div
            className={cn(
                "aspect-[210/297] h-fit w-full bg-white text-black",
                className,
            )}
            ref={containerRef}
        >

            <div
                className={cn("space-y-6 p-10", !width && "invisible")}
                style={{
                    zoom: (1 / 794) * width,
                }}
                ref={contentRef}
                id="resumeContent"
            >
                <Template resumeData={resumeData} />
            </div>
        </div>
    )
}

export default ResumePreview
