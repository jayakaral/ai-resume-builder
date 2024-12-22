import { Button } from '@/components/ui/button'
import { EditorFormProps } from '@/lib/types'
import { Plus } from 'lucide-react'
import React from 'react'

const CustomForm = ({ resumeData, setResumeData }: EditorFormProps) => {
    return (
        <div className="mx-auto max-w-xl space-y-6">
            <div className="flex justify-center">
                <Button
                    type="button"
                    onClick={() => {
                    }}
                >
                    <Plus /> Add Custom Section
                </Button>
            </div>
        </div>
    )
}

export default CustomForm
