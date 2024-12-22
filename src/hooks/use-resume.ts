import { create } from "zustand";
import { ResumeValues } from "@/lib/schema.zod";

interface EditorFormProps {
    resumeData: ResumeValues;
    setResumeData: (data: ResumeValues | ((prevState: ResumeValues) => ResumeValues)) => void;
}


const useResume = create<EditorFormProps>((set) => ({
    resumeData: {},
    setResumeData: (data: unknown) => {
        if (typeof data === "function") {
            set((state) => {
                return { resumeData: data(state.resumeData) };
            });
        } else {
            set({ resumeData: data as ResumeValues });
        }
    },
}));

export default useResume;