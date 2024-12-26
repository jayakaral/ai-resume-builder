"use client"
import { ResumeValues } from '@/lib/schema.zod';
import { showMonthYear } from '@/lib/utils';
import React from 'react'

interface Props {
    resumeData: ResumeValues
}

const Template = ({
    resumeData
}: Props) => {

    const {
        firstName,
        lastName,
        jobTitle,
        email,
        phone,
        summary,
        skills = [],
        fieldsOrder,
    } = resumeData;

    const educations = resumeData.educations?.map(edu => ({
        ...edu,
        startDate: showMonthYear(edu.startDate),
        endDate: showMonthYear(edu.endDate),
    }));

    const workExperiences = resumeData.workExperiences?.map(exp => ({
        ...exp,
        startDate: showMonthYear(exp.startDate),
        endDate: showMonthYear(exp.endDate),
    }));

    const projects = resumeData.projects?.map(project => ({
        ...project,
        startDate: showMonthYear(project.startDate),
        endDate: showMonthYear(project.endDate),
    }));

    const customSections = resumeData.customSections.map(section => ({
        ...section,
        items: section.items.map(item => ({
            ...item,
            startDate: showMonthYear(item.startDate),
            endDate: showMonthYear(item.endDate),
        })
        )
    }));

    return (
        <div
            // className={"aspect-[210/297] h-fit w-full bg-white text-black border p-5"}
            className='text-justify'
        >
            <div className="text-center text-2xl uppercase">{firstName} {lastName}</div>
            <div className="flex gap-3 text-sm">
                {email && <div>{email}</div>}
                {phone && <div>{phone}</div>}
            </div>

            <main className="space-y-2">

                {SummarySection(summary)}

                {fieldsOrder?.map((field) => (
                    <React.Fragment key={field}>
                        {field === "workExperiences" && WorkExperienceSection(workExperiences)}
                        {field === "educations" && EducationSection(educations)}
                        {field === "skills" && SkillsSection(skills)}
                        {field === "projects" && ProjectSection(projects)}
                    </React.Fragment>
                ))}

                {customSections.map((section, index) => (
                    <Section title={section.title} key={index}>
                        {section.items.map((d, index) => (
                            <div key={index} className="mt-1">
                                <div className="flex justify-between">
                                    <div className="text-sm">{d.title}</div>
                                    <div className="text-xs font-semibold">{d.startDate} - {d.endDate}</div>
                                </div>
                                <div className="text-xs">{d.description}</div>
                            </div>
                        ))}
                    </Section>
                ))}
            </main>
        </div>
    )
}

export default Template

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => {
    return (
        <section>
            <h2 className="text-lg border-b uppercase">{title || 'Untitled'}</h2>
            <div className="space-y-1">
                {children}
            </div>
        </section>
    )
}

const SummarySection = (summary: ResumeValues["summary"]) => {
    if (!summary) return null;
    return (
        <Section title="Summary">
            <p className="text-sm">{summary}</p>
        </Section>
    )
}

const EducationSection = (educations: ResumeValues["educations"]) => {
    if (!educations?.length) return null;
    return (
        <Section title="Education">
            {educations.map((education, index) => (
                <div key={index} className="">
                    <div className="">{education.degree}</div>
                    <div className="flex justify-between">
                        <div className="text-sm">{education.school}</div>
                        <div className="text-xs font-semibold">{education.startDate} - {education.endDate}</div>
                    </div>
                </div>
            ))}
        </Section>
    )
}

const WorkExperienceSection = (workExperiences: ResumeValues["workExperiences"]) => {
    if (!workExperiences?.length) return null;
    return (
        <Section title="Work Experience">
            {workExperiences.map((experience, index) => (
                <div key={index} className="">
                    <div className="">{experience.position}</div>
                    <div className="flex justify-between">
                        <div className="text-sm">{experience.company}</div>
                        <div className="text-xs font-semibold">{experience.startDate} - {experience.endDate}</div>
                    </div>
                    <div className="text-xs">{experience.description}</div>
                </div>
            ))}
        </Section>
    )
}

const ProjectSection = (projects: ResumeValues["projects"]) => {
    if (!projects?.length) return null;
    return (
        <Section title="Projects">
            {projects.map((project, index) => (
                <div key={index} className="">
                    <div className="flex justify-between">
                        <div className="text-sm">{project.title}</div>
                        <div className="text-xs font-semibold">{project.startDate} - {project.endDate ?? "Present"}</div>
                    </div>
                    <div className="text-xs">{project.description}</div>
                </div>
            ))}
        </Section>
    )
}

const SkillsSection = (skills: ResumeValues["skills"]) => {
    if (!skills?.length) return null;
    return (
        <Section title="Skills">
            <div className="text-xs text-justify">
                {skills.join(", ")}
            </div>
        </Section>
    )
}

