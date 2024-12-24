"use client"
import React, { useEffect, useState } from 'react'
import Footer from './footer'
import Breadcrumbs from './breadcrumbs'
import { steps } from './steps'
import { useSearchParams } from 'next/navigation'
import ResumePreviewSection from './resume-preview-section'
import { ResumeValues } from '@/lib/schema.zod'
import { ResumePrismaVal } from '@/lib/types'
import { mapToValues } from '@/lib/utils'
import { useAutoSave, useReloadWarning, useResume } from '@/hooks'

type Props = {
    resume: ResumePrismaVal | null
}

const ResumeEditor = ({ resume }: Props) => {
    const searchParams = useSearchParams();
    const [resumeData, setResumeData] = useState<ResumeValues>(mapToValues(resume));

    const { isSaving, hasUnsavedChanges } = useAutoSave(resumeData);
    useReloadWarning(hasUnsavedChanges);

    const [showSmResumePreview, setShowSmResumePreview] = useState(false);

    const currentStep = searchParams.get("step") || steps[0].key;

    function setStep(key: string) {
        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.set("step", key);
        window.history.pushState(null, "", `?${newSearchParams.toString()}`);
    }

    const FormComponent = steps.find(step => step.key === currentStep)?.component;

    const { setResumeData: setData } = useResume();

    useEffect(() => {
        setData(resumeData);
    }, [resumeData, setData]);


    return (
        <div className="flex grow flex-col noscrollbar">
            <header className='text-center px-3 py-4 border-b space-y-1'>
                <h1 className="text-2xl font-bold">Design your resume</h1>
                <p className="text-sm text-muted-foreground">
                    Follow the steps below to create your resume. Your progress will be
                    saved automatically.
                </p>
            </header>

            <main className="relative grow">
                <div className="absolute bottom-0 top-0 flex w-full divide-x">
                    <div className="left w-1/2 space-y-6 overflow-y-auto p-3">
                        <Breadcrumbs currentStep={currentStep} setCurrentStep={setStep} />

                        {FormComponent && <FormComponent
                            resumeData={resumeData}
                            setResumeData={setResumeData}
                        />}
                    </div>
                    <ResumePreviewSection
                        resumeData={resumeData}
                        className='flex'
                    />
                </div>
            </main>

            <Footer
                currentStep={currentStep}
                setCurrentStep={setStep}
                isSaving={isSaving}
                hasUnsavedChanges={hasUnsavedChanges}
                showSmResumePreview={showSmResumePreview}
                setShowSmResumePreview={setShowSmResumePreview}
            />
        </div>
    )
}

export default ResumeEditor