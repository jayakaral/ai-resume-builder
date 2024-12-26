import { Button } from '@/components/ui/button'
import React from 'react'
import { steps } from './steps';
import { CircleCheck, FileUserIcon, PenLineIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface FooterProps {
    currentStep: string;
    setCurrentStep: (step: string) => void;
    isSaving: boolean;
    hasUnsavedChanges: boolean;
    showSmResumePreview: boolean;
    setShowSmResumePreview: (showSmResumePreview: boolean) => void;
}

const Footer: React.FC<FooterProps> = ({
    currentStep,
    setCurrentStep,
    isSaving,
    hasUnsavedChanges,
    showSmResumePreview,
    setShowSmResumePreview
}) => {

    const previousStep = steps.find((_, index) => steps[index + 1]?.key === currentStep)?.key;
    const nextStep = steps.find((_, index) => steps[index - 1]?.key === currentStep)?.key;

    const handleNextStep = () => {
        if (nextStep) {
            setCurrentStep(nextStep);
        }
    }

    const handlePreviousStep = () => {
        if (previousStep) {
            setCurrentStep(previousStep);
        }
    }

    return (
        <footer className='w-full border-t px-3 py-4 select-none'>
            <div className="flex max-w-7xl mx-auto gap-3 justify-between flex-wrap">
                <div className="flex items-center gap-3">
                    <Button
                        variant={'secondary'}
                        disabled={!previousStep}
                        onClick={handlePreviousStep}
                    >
                        Previous Step
                    </Button>
                    <Button
                        disabled={!nextStep}
                        onClick={handleNextStep}
                    >
                        Next Step
                    </Button>
                </div>

                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setShowSmResumePreview(!showSmResumePreview)}
                    className="md:hidden"
                    title={
                        showSmResumePreview ? "Show input form" : "Show resume preview"
                    }
                >
                    {showSmResumePreview ? <PenLineIcon /> : <FileUserIcon />}
                </Button>
                <div className="flex items-center gap-3">
                    <Button variant="secondary" asChild>
                        <Link href="/resumes">Close</Link>
                    </Button>
                    <p
                        className={cn(
                            "text-muted-foreground flex items-center gap-1",
                        )}
                    >
                        {isSaving ? (
                            <>
                                <CircleCheck className="size-4 animate-spin" />
                                <span>Saving...</span>
                            </>
                        ) : hasUnsavedChanges ? (
                            <>
                                <span>Unsaved changes</span>
                            </>
                        ) : (
                            <>
                                <CircleCheck className="size-4" />
                                <span>Saved</span>
                            </>
                        )}
                    </p>
                </div>

            </div>

        </footer>
    )
}

export default Footer
