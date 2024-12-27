import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { CustomSectionValues } from '@/lib/schema.zod';
import { showMonthYear } from '@/lib/utils';
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Textarea } from '@/components/ui/textarea';
import DatePicker from '@/components/date-picker';
import SortableItemMain from '@/components/sortable-item-main';

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

    const { title, startDate, endDate } = form.watch(
        `customSections.${sectionIndex}.items.${index}`
    );

    return (
        <SortableItemMain
            id={id}
            index={index}
            remove={remove}
            isExpanded={isExpanded}
            setExpandedIndex={setExpandedIndex}
            preview={(
                <>
                    <p className="truncate">{title || '(Unspecified)'}</p>
                    <p className="text-sm">
                        {showMonthYear(startDate)} {startDate && endDate && '-'} {showMonthYear(endDate)}
                    </p>
                </>
            )}
        >
            <FormField
                control={form.control}
                name={`customSections.${sectionIndex}.items.${index}.title`}
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
                    name={`customSections.${sectionIndex}.items.${index}.startDate`}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Start Date</FormLabel>
                            <FormControl>
                                <DatePicker
                                    selected={field.value}
                                    placeholder='Start Date'
                                    endDate={endDate}
                                    onChange={(date) => field.onChange(date)}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name={`customSections.${sectionIndex}.items.${index}.endDate`}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>End Date</FormLabel>
                            <FormControl>
                                <DatePicker
                                    selected={field.value}
                                    placeholder='End Date'
                                    startDate={startDate}
                                    onChange={(date) => field.onChange(date)}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>

            <FormField
                control={form.control}
                name={`customSections.${sectionIndex}.items.${index}.description`}
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
        </SortableItemMain>

    );
};

export default SortableItem;
