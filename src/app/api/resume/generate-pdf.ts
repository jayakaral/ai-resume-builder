import { ResumeValues } from "@/lib/schema.zod";
import { PDFDocument, StandardFonts } from "pdf-lib";

const generatePDF = async (resumeData: ResumeValues) => {
    const pdfDoc = await PDFDocument.create();
    let page = pdfDoc.addPage([595, 842]); // A4 size (width x height)
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

    let cursorY = 800; // Initial cursor position
    const marginX = 50; // Margin from the left side
    const maxWidth = 495; // Max width for text wrapping (page width - margins)

    const ensureSpace = () => {
        if (cursorY < 50) {
            page = pdfDoc.addPage([595, 842]);
            cursorY = 800;
        }
    };

    const drawText = (text: string, indent = 0) => {
        const words = text.split(" ");
        let line = "";
        words.forEach((word) => {
            const testLine = line + word + " ";
            const textWidth = font.widthOfTextAtSize(testLine, 12);
            if (textWidth + marginX + indent > maxWidth) {
                page.drawText(line, { x: marginX + indent, y: cursorY, size: 12, font });
                cursorY -= 15;
                ensureSpace();
                line = word + " ";
            } else {
                line = testLine;
            }
        });
        if (line) {
            page.drawText(line, { x: marginX + indent, y: cursorY, size: 12, font });
            cursorY -= 15;
            ensureSpace();
        }
    };

    const drawBulletText = (text: string) => {
        drawText(`• ${text}`, 10);
    };

    const drawSectionTitle = (title: string) => {
        page.drawText(title.toUpperCase(), { x: marginX, y: cursorY, size: 14, font });
        cursorY -= 20;
        ensureSpace();
    };

    const drawHeader = () => {
        const fullName = `${resumeData.firstName || ""} ${resumeData.lastName || ""}`;
        const contactDetails = [
            `${resumeData.email || ""}`,
            `${resumeData.phone || ""}`,
            `${resumeData.city || ""}, ${resumeData.country || ""}`,
        ].join(" | ");

        page.drawText(fullName, { x: marginX, y: cursorY, size: 20, font });
        cursorY -= 20;
        page.drawText(contactDetails, { x: marginX, y: cursorY, size: 12, font });
        cursorY -= 40;
        ensureSpace();
    };

    // Draw Header
    drawHeader();

    // Objective Section
    if (resumeData.description) {
        drawSectionTitle("Objective");
        drawText(resumeData.description);
        cursorY -= 20;
    }

    // Experience Section
    if (resumeData.workExperiences?.length) {
        drawSectionTitle("Experience");
        resumeData.workExperiences.forEach((experience) => {
            ensureSpace();
            drawText(`${experience.position || ""} at ${experience.company || ""}`, 10);
            drawText(`${experience.startDate || ""} - ${experience.endDate || ""}`, 10);
            drawBulletText(experience.description || "");
            cursorY -= 10;
        });
    }

    // Education Section
    if (resumeData.educations?.length) {
        drawSectionTitle("Education");
        resumeData.educations.forEach((education) => {
            ensureSpace();
            drawText(`${education.school || ""}, ${education.degree || ""}`, 10);
            drawText(`${education.startDate || ""} - ${education.endDate || ""}`, 10);
            cursorY -= 10;
        });
    }

    // Projects Section
    if (resumeData.projects?.length) {
        drawSectionTitle("Projects");
        resumeData.projects.forEach((project) => {
            ensureSpace();
            drawText(`${project.title || ""} (${project.startDate || ""} - ${project.endDate || "Present"})`, 10);
            drawBulletText(project.description || "");
            cursorY -= 10;
        });
    }

    // Skills Section
    if (resumeData.skills?.length) {
        drawSectionTitle("Skills");
        resumeData.skills.forEach((skill: string) => {
            ensureSpace();
            drawBulletText(skill);
        });
        cursorY -= 20;
    }

    return pdfDoc.save();
};

export { generatePDF };
