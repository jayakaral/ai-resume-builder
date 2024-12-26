import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ResumeValues } from '@/lib/schema.zod';
import { generateSummary } from './actions';
import { Loader, WandSparklesIcon } from 'lucide-react';

interface GenerateSummaryButtonProps {
    resumeData: ResumeValues;
    onSuccess: (summary: string) => void;
}

const GenerateSummaryButton = ({ resumeData, onSuccess }: GenerateSummaryButtonProps) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleClick = async () => {
        setLoading(true);
        setError(null);

        try {
            const summary = await generateSummary(resumeData);
            onSuccess(summary);
        } catch (error) {
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mt-2 flex items-center justify-center">
            <Button
                type="button"
                onClick={handleClick}
                disabled={loading}
            >
                {loading && <Loader className="size-5 animate-spin" />}
                <WandSparklesIcon className="size-4" />
                Generate summary
            </Button>
            {error && (
                <div className="ml-2 text-red-500 text-sm">
                    <span>{error}</span>
                </div>
            )}
        </div>
    );
}

export default GenerateSummaryButton;