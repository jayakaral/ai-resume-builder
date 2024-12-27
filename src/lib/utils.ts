import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { ResumeValues } from "./schema.zod";
import { ResumePrismaVal } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const mapToValues = (data?: ResumePrismaVal | null) => {
  const resume = {
    id: data?.id,
    title: data?.title || undefined,
    city: data?.city || undefined,
    country: data?.country || undefined,
    description: data?.description || undefined,
    email: data?.email || undefined,
    firstName: data?.firstName || undefined,
    jobTitle: data?.jobTitle || undefined,
    lastName: data?.lastName || undefined,
    phone: data?.phone || undefined,
    skills: data?.skills?.map(skill => ({
      skill: skill.skill || undefined,
      level: skill.level || undefined
    })) || [],
    educations: data?.educations?.map(edu => ({
      degree: edu.degree || undefined,
      school: edu.school || undefined,
      startDate: edu.startDate?.toISOString(),
      endDate: edu.endDate?.toISOString(),
    })) || [],
    workExperiences: data?.workExperiences?.map(exp => ({
      company: exp.company || undefined,
      description: exp.description || undefined,
      endDate: exp.endDate?.toISOString(),
      position: exp.position || undefined,
      startDate: exp.startDate?.toISOString(),
    })) || [],
    summary: data?.summary || undefined,
    fieldsOrder: (!data?.fieldsOrder || data?.fieldsOrder?.length < 3) ? ["educations", "workExperiences", "skills"] : data?.fieldsOrder,
    customSections: data?.customSections?.map(section => ({
      title: section.title || "",
      items: section.items.map(item => ({
        title: item.title || undefined,
        description: item.description || undefined,
        startDate: item.startDate?.toISOString(),
        endDate: item.endDate?.toISOString(),
      }))
    })) || [],
    margins: {
      top: data?.margins?.top || 40,
      bottom: data?.margins?.bottom || 40,
      left: data?.margins?.left || 40,
      right: data?.margins?.right || 40,
      unit: data?.margins?.unit || "px"
    }
  } satisfies ResumeValues;

  return resume;
}

export const showMonthYear = (date: Date | string | undefined) => {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

export const MM_TO_PX = 3.7795275591;