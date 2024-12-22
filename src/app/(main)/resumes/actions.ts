"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteResume(id: string) {
    const { user } = await auth();
    const userId = user?.id;

    if (!userId) {
        throw new Error("User not authenticated");
    }

    const resume = await prisma.resume.findUnique({
        where: {
            id,
            userId,
        },
    });

    if (!resume) {
        throw new Error("Resume not found");
    }


    await prisma.resume.delete({
        where: {
            id,
        },
    });

    revalidatePath("/resumes");
}
