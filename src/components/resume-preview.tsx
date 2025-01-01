import React, { useEffect, useRef, useState } from "react";
import { cn } from '@/lib/utils';
import Template from "./template";
import { ResumeValues } from "@/lib/schema.zod";
import { useDimensions } from "@/hooks";
import Template2 from "./template2";
import { Button } from "./ui/button";

// mm to px
const MM_TO_PX = 3.7795275591;
const MAX_HEIGHT = 1022;

// Utility function to process children
const processChild = (
    child: HTMLElement,
    maxHeight: number,
    currentPage: HTMLElement[],
    pages: HTMLElement[][],
    currentHeight: { value: number }
) => {
    const childHeight = child.offsetHeight;

    // If the child exceeds the remaining height on the current page
    if (currentHeight.value + childHeight > maxHeight) {
        // Check for nested children
        if (child.children.length > 0 && !child.classList.contains("single")) {
            console.log(child.nodeName)
            if (child.nodeName === 'SECTION') child.children[0].classList.add('mt-2')
            const nestedChildren = Array.from(child.children) as HTMLElement[];
            nestedChildren.forEach((nestedChild) => {
                processChild(nestedChild, maxHeight, currentPage, pages, currentHeight);
            });
        } else {
            if (currentPage.length > 0) {
                pages.push([...currentPage]);
            }
            currentPage.splice(0, currentPage.length, child);
            currentHeight.value = childHeight;
        }
    } else {
        currentPage.push(child);
        currentHeight.value += childHeight;
    }
};

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
    const [first, setFirst] = useState(0);
    const [pages, setPages] = useState<HTMLElement[][]>([]);
    const { margins } = resumeData;

    useEffect(() => {
        const content = containerRef?.current;
        if (!content) return;

        const aspectRatio = 210 / 297; // A4 aspect ratio
        const pageHeight = content.offsetWidth / aspectRatio;
        setFirst(pageHeight);

        const children = Array.from(content.childNodes[0].childNodes[0].childNodes) as HTMLElement[];

        const pages: HTMLElement[][] = [];
        let currentPage: HTMLElement[] = [];
        let currentHeight = { value: 0 };

        children.forEach((child) => {
            processChild(child, MAX_HEIGHT, currentPage, pages, currentHeight);
        });

        if (currentPage.length > 0) {
            pages.push([...currentPage]);
        }
        setPages(pages);
    }, [width, resumeData]);

    useEffect(() => {
        document.documentElement.style.setProperty("--resume-margin-top", `${margins.top / MM_TO_PX}mm`);
        document.documentElement.style.setProperty("--resume-margin-bottom", `${margins.bottom / MM_TO_PX}mm`);
        document.documentElement.style.setProperty("--resume-margin-left", `${margins.left / MM_TO_PX}mm`);
        document.documentElement.style.setProperty("--resume-margin-right", `${margins.right / MM_TO_PX}mm`);
    }, [margins]);


    return (
        <>
            <div
                className={cn(
                    "aspect-[210/297] h-fit w-full bg-white text-black",
                    className,
                    // "invisible absolute"
                )}
                ref={containerRef}
                style={{
                    '--after-height': `${first}px`,
                } as React.CSSProperties}
            >
                <div
                    className={cn("space-y-6 p-[6mm]", !width && "invisible")}
                    style={{
                        zoom: (1 / 794) * width,
                        paddingTop: `${margins.top}${margins.unit}`,
                        paddingBottom: `${margins.bottom}${margins.unit}`,
                        paddingLeft: `${margins.left}${margins.unit}`,
                        paddingRight: `${margins.right}${margins.unit}`,
                    }}
                    ref={contentRef}
                    id="resumeContent"
                >
                    <Template resumeData={resumeData} />
                </div>
            </div>
            <div
                className={cn(
                    "aspect-[210/297] h-fit w-full bg-white text-black hidden",
                    className
                )}
            >
                <div className="flex gap-10 h-full w-full flex-col font-[Inter] text-justify">
                    {pages.map((page, index) => (
                        <div
                            key={index}
                            className="bg-white text-black relative aspect-[210/297]"
                            style={{
                                zoom: (1 / 794) * width,
                                paddingTop: `${margins.top}${margins.unit}`,
                                paddingBottom: `${margins.bottom}${margins.unit}`,
                                paddingLeft: `${margins.left}${margins.unit}`,
                                paddingRight: `${margins.right}${margins.unit}`,
                            }}
                            dangerouslySetInnerHTML={{
                                __html: page.map((el) => el.outerHTML).join(""),
                            } as any}
                        />
                    ))}
                </div>
            </div>
        </>
    );
};

export default ResumePreview;
