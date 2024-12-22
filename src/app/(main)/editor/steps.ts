import { EditorFormProps } from "@/lib/types";
import EducationForm from "./forms/education-form";
import GeneralInfoForm from "./forms/general-info-form";
import PersonalInfoForm from "./forms/personal-info-form";
import SkillsForm from "./forms/skills-form";
import SummaryForm from "./forms/summary-form";
import WorkExperienceForm from "./forms/work-experience-form";
import CustomForm from "./forms/custom/custom-form";


export const steps: {
    title: string;
    key: string;
    component: React.ComponentType<EditorFormProps>;
}[] = [
        { title: "General", key: "general", component: GeneralInfoForm },
        { title: "Personal info", key: "personal-info", component: PersonalInfoForm },
        { title: "Work experience", key: "work-experience", component: WorkExperienceForm },
        { title: "Education", key: "education", component: EducationForm },
        { title: "Skills", key: "skills", component: SkillsForm },
        { title: "Summary", key: "summary", component: SummaryForm },
        // { title: "Custom", key: "custom", component: CustomForm }
    ];