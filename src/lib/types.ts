import { Prisma } from "@/generated/prisma";
import { ResumeValues } from "./schema.zod";

export interface EditorFormProps {
    resumeData: ResumeValues;
    setResumeData: React.Dispatch<React.SetStateAction<ResumeValues>>;
}

export const resumeDataInclude = {
    educations: true,
    workExperiences: true,
    customSections: {
        include: {
            items: true,
        },
    },
    skills: true
} satisfies Prisma.ResumeInclude;


export type ResumePrismaVal = Prisma.ResumeGetPayload<{
    include: typeof resumeDataInclude;
}>