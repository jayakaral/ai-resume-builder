import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { CustomSectionValues } from '@/lib/schema.zod';
import { cn } from '@/lib/utils';
import { GripVertical, Trash } from 'lucide-react';
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Textarea } from '@/components/ui/textarea';

type SortableItemProps = {
    id: string;
    index: number;
    sectionIndex: number;
    form: UseFormReturn<CustomSectionValues>;
    remove: () => void;
    isExpanded: boolean;
    setExpandedIndex: (index: number | null) => void;
};

const SortableItem: React.FC<SortableItemProps> = ({
    id,
    form,
    index,
    sectionIndex,
    remove,
    isExpanded,
    setExpandedIndex
}) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    const [isHovered, setIsHovered] = React.useState(false);
    const formRef = React.useRef<HTMLDivElement>(null);


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

    const { title, startDate, endDate } = form.watch(
        `customSections.${sectionIndex}.data.${index}`
    );

    return (
        <div
            style={style}
            ref={setNodeRef}
            {...attributes}
            className={cn(
                'rounded-md border bg-background shadow-sm py-3 select-none',
                isDragging && "relative z-50 cursor-grab shadow-xl max-h-20 overflow-hidden",
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
                        {title || 'Untitled'}
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
                        onClick={remove}>
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
                    name={`customSections.${sectionIndex}.data.${index}.title`}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="Enter title" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name={`customSections.${sectionIndex}.data.${index}.startDate`}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Start Date</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="date"
                                        placeholder="Start date"
                                        value={field.value?.slice(0, 10) || ''}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name={`customSections.${sectionIndex}.data.${index}.endDate`}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>End Date</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="date"
                                        placeholder="End date"
                                        value={field.value?.slice(0, 10) || ''}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name={`customSections.${sectionIndex}.data.${index}.description`}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea rows={6} {...field} placeholder="Enter description" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
        </div>
    );
};

export default SortableItem;
