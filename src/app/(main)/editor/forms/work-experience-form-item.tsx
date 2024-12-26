import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { WorkExperienceValues } from '@/lib/schema.zod';
import React from 'react'
import { UseFormReturn } from 'react-hook-form';
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { cn, showMonthYear } from '@/lib/utils'
import { GripVertical, Trash } from 'lucide-react'
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import DatePicker from '@/components/date-picker';
import GenerateWorkExpButton from './generate-work-exp-btn';

interface WorkExperienceItemProps {
    id: string;
    form: UseFormReturn<WorkExperienceValues>;
    index: number;
    remove: (index: number) => void;
    isExpanded: boolean;
    setExpandedIndex: (index: number | null) => void;
}

const WorkExperienceItem = ({
    id,
    form,
    index,
    remove,
    isExpanded,
    setExpandedIndex
}: WorkExperienceItemProps) => {
    const formRef = React.useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = React.useState(false);

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };


    const handleToggle = () => {
        setExpandedIndex(isExpanded ? null : index);
    };


    React.useEffect(() => {
        if (formRef.current) {
            formRef.current.style.maxHeight = isExpanded
                ? `${formRef.current.scrollHeight}px`
                : '0px';
        }
    }, [isExpanded]);

    const { company, endDate, position, startDate } = form.watch(`workExperiences.${index}`);

    return (
        <div
            style={style}
            ref={setNodeRef}
            {...attributes}
            className={cn(
                'rounded-md border bg-background shadow-sm py-3 select-none',
                isDragging && "relative z-50 cursor-grab shadow-xl",
            )}
        >
            <div className="flex gap-3 relative min-h-10">

                <div className={cn(
                    "absolute right-[100%] top-1/2 -translate-y-1/2 mr-1 opacity-0 transition-opacity",
                    isHovered && "opacity-100",
                )}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    {...listeners}
                >
                    <GripVertical className="size-5 cursor-grab text-muted-foreground focus:outline-none" />
                </div>

                <div
                    className={cn(
                        "cursor-pointer grow px-3 hover:text-indigo-600",
                        // isExpanded && "border-b pb-2"
                    )}
                    onClick={handleToggle}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <p className="">
                        {!(position || company) && "(Unspeficied)"}
                        {position} {company && `at ${company}`}
                    </p>
                    <p className="text-sm">
                        {showMonthYear(startDate)} {startDate && endDate && '-'} {showMonthYear(endDate)}
                    </p>
                </div>

                <div className={cn(
                    "absolute left-[100%] top-1/2 -translate-y-1/2 ml-2 opacity-0 transition-opacity",
                    isHovered && "opacity-100",
                )}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <button
                        type="button"
                        onClick={() => remove(index)}>
                        <Trash size={18} />
                    </button>
                </div>
            </div>

            <div
                className={cn(
                    "space-y-3 px-3 pb-1 overflow-hidden transition-all duration-300 max-h-0",
                    isExpanded && "mt-3",
                )}
                ref={formRef}
            >
                <FormField
                    control={form.control}
                    name={`workExperiences.${index}.position`}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Job title</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name={`workExperiences.${index}.company`}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Company</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="grid grid-cols-2 gap-3">
                    <FormField
                        control={form.control}
                        name={`workExperiences.${index}.startDate`}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Start date</FormLabel>
                                <FormControl>
                                    <DatePicker
                                        selected={field.value}
                                        placeholder='Start Date'
                                        endDate={form.watch(`workExperiences.${index}.endDate`)}
                                        onChange={(date) => field.onChange(date)}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name={`workExperiences.${index}.endDate`}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>End date</FormLabel>
                                <FormControl>
                                    <DatePicker
                                        selected={field.value}
                                        placeholder='End Date'
                                        startDate={form.watch(`workExperiences.${index}.startDate`)}
                                        onChange={(date) => field.onChange(date)}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <FormDescription>
                    Leave <span className="font-semibold">end date</span> empty if you are
                    currently working here.
                </FormDescription>
                <FormField
                    control={form.control}
                    name={`workExperiences.${index}.description`}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <div className="flex flex-col items-end">
                                    <GenerateWorkExpButton
                                        onSuccess={(description) => field.onChange(description)}
                                    />
                                    <Textarea {...field} rows={6} />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>

        </div>
    );
};

export default WorkExperienceItem;
