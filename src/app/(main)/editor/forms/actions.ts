"use server";

import { auth } from "@/lib/auth";
import { gemeini1_5Flash } from "@/lib/models";
import { resumeSchema, ResumeValues } from "@/lib/schema.zod";
import { generateObject, generateText } from 'ai'



export const generateSummary = async (data: ResumeValues) => {

    const { user } = await auth();

    if (!user) {
        throw new Error("You must be logged in to generate a summary");
    }

    const { jobTitle, workExperiences, educations, skills } = data;

    const systemMessage = `
    You are a professional resume generator AI. Your task is to craft a concise, professional, and impactful resume summary using the provided data. 
    Your output should highlight the candidate's most relevant skills, experiences, and achievements for a potential employer.
    Return only the summary, with no additional context or explanations.
    `;
    const userMessage = `
    Please generate a professional resume summary from this data:
    
    Job Title: ${jobTitle || "N/A"}
    
    Work Experience:
    ${workExperiences
            ?.map(
                (exp) => `
        Position: ${exp.position || "N/A"} at ${exp.company || "N/A"} 
        Duration: ${exp.startDate || "N/A"} to ${exp.endDate || "Present"}
        Description: ${exp.description || "N/A"}
        `,
            )
            .join("\n\n")}
    
    Education:
    ${educations
            ?.map(
                (edu) => `
        Degree: ${edu.degree || "N/A"} at ${edu.school || "N/A"} 
        Duration: ${edu.startDate || "N/A"} to ${edu.endDate || "N/A"}
        `,
            )
            .join("\n\n")}
    
    Skills:
    ${skills?.join(", ") || "N/A"}
    `;

    try {
        const response = await generateText({
            model: gemeini1_5Flash,
            system: systemMessage,
            prompt: userMessage
        });

        const text = response.text;
        console.log(text)
        return text.trim();
    } catch (error) {
        console.error(error);
        throw new Error("Something went wrong. Please try again.");
    }
}

export const generateWorkExperience = async (description: string) => {
    const { user } = await auth();

    if (!user) {
        throw new Error("You must be logged in to generate a summary");
    }

    const systemMessage = `
    You are a professional resume generator AI. Your task is to craft a concise, professional, and impactful work experience entry using the provided description. 
    Your output should highlight the candidate's most relevant skills, experiences, and achievements for a potential employer.
    Return only the work experience entry, with no additional context or explanations.
    `;
    const userMessage = `
    Please generate a work experience description from this description:
    
    Description: ${description}
    `;

    try {
        const response = await generateText({
            model: gemeini1_5Flash,
            system: systemMessage,
            prompt: userMessage
        });

        const text = response.text;
        console.log(text)
        return text.trim();
    } catch (error) {
        console.error(error);
        throw new Error("Something went wrong. Please try again.");
    }
}


export const enhaceResume = async (jobDescription: string, resume: ResumeValues) => {
    const { user } = await auth();

    if (!user) {
        throw new Error("You must be logged in to generate a summary");
    }

    const systemMessage = `
    You are a professional resume generator AI. Your task is to enhance the provided resume with the job description. 
    Your output should include the most relevant skills, experiences, and achievements from the job description.
    `;
    const userMessage = `
    Please enhance this resume with the job description:
    
    Job Description: ${jobDescription}
    
    Resume:

    ${JSON.stringify(resume, null, 2)}
    `;

    try {
        // const response = await generateObject({
        //     model: gemeini1_5Flash,
        //     system: systemMessage,
        //     prompt: userMessage,
        //     schema: resumeSchema,
        //     output: "object"
        // })

        // console.log(response.object)
        // return response.object;

        const response = await generateText({
            model: gemeini1_5Flash,
            system: systemMessage,
            prompt: userMessage,
            maxSteps: 3,
            maxTokens: 128000
        });

        const text = response.text;
        console.log(text)
        return text.trim();
    } catch (error) {
        console.error(error);
        throw new Error("Something went wrong. Please try again.");
    }
}