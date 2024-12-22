import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer';
import ejs from 'ejs';
import path from 'path';


export async function POST(req: Request) {
    const { resumeData } = await req.json();
    try {
        // Path to your EJS template
        const templatePath = path.join(process.cwd(), 'src', 'templates', 'resume-template.ejs');

        // Render the EJS template with the provided data
        const html = await ejs.renderFile(templatePath, resumeData as Record<string, any>);

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
