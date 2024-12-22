"use server"

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { ResumeValues } from "@/lib/schema.zod"

export const saveResume = async (resumeData: ResumeValues) => {
    const { id, educations, workExperiences, projects, ...values } = resumeData;

    const { user } = await auth();
    if (!user) {
        throw new Error("Unauthorized");
    }

    const existingResume = id ? await prisma.resume.findUnique({
        where: {
            id,
        },
    }) : null;

    if (id && !existingResume) {
        throw new Error("Resume not found");
    }

    if (id) {
        return prisma.resume.update({
            where: { id },
            data: {
                ...values,
                educations: {
                    deleteMany: {},
                    create: educations?.map(edu => ({
                        ...edu,
                        startDate: new Date(),
                        endDate: new Date()
                    }))
                },
                workExperiences: {
                    deleteMany: {},
                    create: workExperiences?.map(work => ({
                        ...work,
                        startDate: new Date(),
                        endDate: new Date()
                    }))
                },
            },
        });
    }

    return prisma.resume.create({
        data: {
            ...values,
            userId: user.id,
            educations: {
                create: educations?.map(edu => ({
                    ...edu,
                    startDate: new Date(),
                    endDate: new Date()
                }))
            },
            workExperiences: {
                create: workExperiences?.map(work => ({
                    ...work,
                    startDate: new Date(),
                    endDate: new Date()
                }))
            },
        },
    });
}