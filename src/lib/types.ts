import { Prisma } from "@prisma/client";
import { ResumeValues } from "./schema.zod";

export interface EditorFormProps {
    resumeData: ResumeValues;
    setResumeData: React.Dispatch<React.SetStateAction<ResumeValues>>;
}

export type ResumePrismaVal = Prisma.ResumeGetPayload<{
    include: {
        educations: true;
        workExperiences: true;
    };
}>