import { NextResponse } from "next/server";
import { generatePDF } from "./generate-pdf";
import { ResumeValues } from "@/lib/schema.zod";

export async function POST(req: Request) {
    try {
        const { resumeData }: { resumeData: ResumeValues } = await req.json();

        if (!resumeData) {
            return NextResponse.json({ error: "Resume data is required." }, { status: 400 });
        }

        const pdfBytes = await generatePDF(resumeData);
        const pdfBase64 = Buffer.from(pdfBytes).toString("base64");

        const pdfBlob = new Blob([Uint8Array.from(atob(pdfBase64), c => c.charCodeAt(0))], { type: 'application/pdf' });

        return new NextResponse(pdfBlob, {
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': 'attachment; filename="resume.pdf"',
            },
        });
    } catch (error) {
        console.error("Error generating PDF:", error);
        return NextResponse.json({ error: "Failed to generate PDF." }, { status: 500 });
    }
}