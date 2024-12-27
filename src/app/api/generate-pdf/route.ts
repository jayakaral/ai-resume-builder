import { NextResponse } from 'next/server';
import chromium from '@sparticuz/chromium-min';
import puppeteer from 'puppeteer-core';
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

    const { workExperiences, educations, customSections, margins, ...values } = resumeData;

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
        const templatePath = path.join(process.cwd(), 'src', 'templates', 'resume-template.ejs');

        const html = await ejs.renderFile(templatePath, data);

        // return new NextResponse(html, { headers: { 'Content-Type': 'text/html' } });

        // Launch Puppeteer to generate the PDF
        // const browser = await puppeteer.launch({
        //     headless: true, // Set false if debugging
        //     args: ['--no-sandbox', '--disable-setuid-sandbox'], // Required for some hosting platforms
        // });

        const browser = await puppeteer.launch({
            // args: isLocal ? puppeteer.defaultArgs() : chromium.args,
            args: [...chromium.args, '--hide-scrollbars', '--disable-web-security', '--no-sandbox', '--disable-setuid-sandbox'],
            defaultViewport: chromium.defaultViewport,
            executablePath: process.env.CHROME_EXECUTABLE_PATH || await chromium.executablePath('https://github.com/Sparticuz/chromium/releases/download/v131.0.1/chromium-v131.0.1-pack.tar'),
            headless: chromium.headless,
        });

        const page = await browser.newPage();
        await page.setContent(html, { waitUntil: 'networkidle0' });
        const pdfBuffer = await page.pdf({
            format: 'A4',
            printBackground: true,
            margin: {
                top: `${margins.top}${margins.unit}`,
                bottom: `${margins.bottom}${margins.unit}`,
                left: `${margins.left}${margins.unit}`,
                right: `${margins.right}${margins.unit}`,
            },
        });

        await browser.close();

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