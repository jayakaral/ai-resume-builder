import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { EducationValues } from '@/lib/schema.zod'
import { cn } from '@/lib/utils'
import { GripVertical, Trash } from 'lucide-react'
import React from 'react'
import { UseFormReturn } from 'react-hook-form'
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

type EducationItemProps = {
    id: string;
    index: number;
    form: UseFormReturn<EducationValues>;
    remove: (index?: number | number[] | undefined) => void;
    isExpanded: boolean;
    setExpandedIndex: (index: number | null) => void;
};

const EducationItem = ({
    id,
    form,
    index,
    remove,
    isExpanded,
    setExpandedIndex
}: EducationItemProps) => {
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

    const { degree, endDate, school, startDate } = form.watch(`educations.${index}`);

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

                <div
                    className={cn(
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
                    <p className="truncate">
                        {!(degree || school) && "(Unspecified)"}
                        {degree} {school && degree && `at`} {school}
                    </p>
                    <p className="text-sm">
                        {startDate} {startDate && endDate && '-'} {endDate}
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
                    name={`educations.${index}.degree`}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Degree</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name={`educations.${index}.school`}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>School</FormLabel>
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
                        name={`educations.${index}.startDate`}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Start date</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="date"
                                        value={field.value?.slice(0, 10)}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name={`educations.${index}.endDate`}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>End date</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="date"
                                        value={field.value?.slice(0, 10)}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
            </div>

        </div>
    );
};

export default EducationItem;