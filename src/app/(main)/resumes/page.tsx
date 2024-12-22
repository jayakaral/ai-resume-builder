import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { Metadata } from "next";
import ResumeItem from "./resume-item";
import CreateResumeButton from "./create-resume-btn";

export const metadata: Metadata = {
    title: "Your resumes",
};

export default async function Page() {
    const { user } = await auth();

    if (!user) {
        return null;
    }

    const [resumes, totalCount] = await Promise.all([
        prisma.resume.findMany({
            where: {
                userId: user.id,
            },
            orderBy: {
                updatedAt: "desc",
            },
            include: {
                educations: true,
                workExperiences: true,
            },
        }),
        prisma.resume.count({
            where: {
                userId: user.id,
            },
        }),
        // getUserSubscriptionLevel(userId),
    ]);

    return (
        <main className="mx-auto w-full max-w-7xl space-y-6 px-3 py-6">
            <CreateResumeButton
                // canCreate={canCreateResume(subscriptionLevel, totalCount)}
                canCreate={true}
            />
            <div className="space-y-1">
                <h1 className="text-3xl font-bold">Your resumes</h1>
                <p>Total: {totalCount}</p>
            </div>
            <div className="flex w-full grid-cols-2 flex-col gap-3 sm:grid md:grid-cols-3 lg:grid-cols-4">
                {resumes.map((resume) => (
                    <ResumeItem key={resume.id} resume={resume} />
                ))}
            </div>
        </main>
    );
}
