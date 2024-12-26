import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer';
import ejs from 'ejs';
import path from 'path';
import { ResumeValues } from '@/lib/schema.zod';
import { auth } from '@/lib/auth';
import { showMonthYear } from '@/lib/utils';


export async function POST(req: Request) {
    const { resumeData } = await req.json() as { resumeData: ResumeValues };

    const { user } = await auth();

    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { workExperiences, educations, customSections, ...values } = resumeData;

    const data = {
        ...values,
        educations: educations?.map(edu => ({
            ...edu,
            startDate: showMonthYear(edu.startDate),
            endDate: showMonthYear(edu.endDate),
        })),
        workExperiences: workExperiences?.map(exp => ({
            ...exp,
            startDate: showMonthYear(exp.startDate),
            endDate: showMonthYear(exp.endDate),
        })),
        customSections: customSections?.map(section => ({
            ...section,
            items: section.items.map(item => ({
                ...item,
                startDate: showMonthYear(item.startDate),
                endDate: showMonthYear(item.endDate),
            })),
        })),
    }


    try {
        // Path to your EJS template
        const templatePath = path.join(process.cwd(), 'src', 'templates', 'resume-template.ejs');

        // Render the EJS template with the provided data
        const html = await ejs.renderFile(templatePath, data);

        // return new NextResponse(html, { headers: { 'Content-Type': 'text/html' } });

        // Launch Puppeteer to generate the PDF
        const browser = await puppeteer.launch({
            headless: true, // Set false if debugging
            args: ['--no-sandbox', '--disable-setuid-sandbox'], // Required for some hosting platforms
        });

        const page = await browser.newPage();
        await page.setContent(html, { waitUntil: 'networkidle0' });
        const pdfBuffer = await page.pdf({
            format: 'A4',
            printBackground: true,
            margin: {
                top: '0.6cm',
                right: '0.6cm',
                bottom: '0.6cm',
                left: '0.6cm',
            },
        });

        await browser.close();

        // Return the PDF as a response
        return new NextResponse(pdfBuffer, {
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': 'attachment; filename="resume.pdf"',
            },
        });
    } catch (error) {
        console.error('Error generating PDF:', error);
        return NextResponse.json({ error: 'Failed to generate PDF' }, { status: 500 });
    }
}
