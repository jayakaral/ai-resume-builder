import { ResumeValues } from '@/lib/schema.zod'
import React, { useEffect, useState } from 'react'
import useDebounce from './use-debounce';
import { saveResume } from '@/app/(main)/editor/actions';
import { useSearchParams } from 'next/navigation';
import { useToast } from './use-toast';
import { Button } from '@/components/ui/button';

const useAutoSave = (resumeData: ResumeValues) => {

    const debouncedResumeData = useDebounce(resumeData, 1500);
    const searchParams = useSearchParams();
    const { toast } = useToast();

    const [lastSavedData, setLastSavedData] = useState(
        structuredClone(resumeData),
    );
    const [resumeId, setResumeId] = useState(resumeData.id);

    const [isSaving, setIsSaving] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const save = async () => {
            setIsSaving(true);
            setIsError(false);

            try {
                const newData = structuredClone(debouncedResumeData);
                const updatedResume = await saveResume(newData);
                console.log('updatedResume');
                setLastSavedData(newData);
                setResumeId(updatedResume.id)

                if (searchParams.get("resumeId") !== updatedResume.id) {
                    const newSearchParams = new URLSearchParams(searchParams);
                    newSearchParams.set("resumeId", updatedResume.id);
                    window.history.replaceState(null, "", `?${newSearchParams.toString()}`);
                }
            } catch (error) {
                console.log(error)
                setIsError(true);
                const { dismiss } = toast({
                    variant: "destructive",
                    description: (
                        <div className="space-y-3" >
                            <p>Could not save changes.</p>
                            <Button
                                variant="secondary"
                                onClick={() => {
                                    dismiss();
                                    save();
                                }}
                            >
                                Retry
                            </Button>
                        </div>
                    ),
                });
            } finally {
                setIsSaving(false);
            }
        }

        const isEqual = JSON.stringify(debouncedResumeData) === JSON.stringify(lastSavedData);

        if (!isEqual && !isSaving && !isError && debouncedResumeData) {
            save();
        }
    }, [
        debouncedResumeData,
        isSaving,
        lastSavedData,
        isError,
        resumeId,
        searchParams,
        toast
    ])

    return {
        isSaving,
        lastSavedData,
        hasUnsavedChanges: JSON.stringify(resumeData) !== JSON.stringify(lastSavedData),
    }
}

export default useAutoSave
