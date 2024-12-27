import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { Metadata } from "next";
import ResumeEditor from "./resume-editor";
import { resumeDataInclude } from "@/lib/types";

interface PageProps {
    searchParams: Promise<{ resumeId?: string }>;
}

export const metadata: Metadata = {
    title: "Design your resume",
};

export default async function Page({ searchParams }: PageProps) {
    const { resumeId } = await searchParams;

    const { user } = await auth();

    if (!user) {
        return null;
    }

    const resumeToEdit = resumeId
        ? await prisma.resume.findUnique({
            where: { id: resumeId, userId: user.id },
            include: resumeDataInclude
        })
        : null;

    return <ResumeEditor resume={{
        ...resumeToEdit,
        firstName: resumeToEdit?.firstName || user.name.split(" ")[0],
        lastName: resumeToEdit?.lastName || user.name.split(" ")[1],
        email: resumeToEdit?.email || user.email,
    } as never} />;
}
