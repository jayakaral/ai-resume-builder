import SortableItemMain from '@/components/sortable-item-main';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SkillLevel } from '@/generated/prisma';
import React from 'react'

interface SkillItemProps {
    id: string;
    form: any;
    index: number;
    remove: (index?: number | number[]) => void;
    isExpanded: boolean;
    setExpandedIndex: (index: number | null) => void;
}


const SkillItem = ({
    id,
    form,
    index,
    remove,
    isExpanded,
    setExpandedIndex
}: SkillItemProps) => {

    const { skill, level } = form.watch(`skills.${index}`);

    return (
        <SortableItemMain
            id={id}
            index={index}
            remove={remove}
            isExpanded={isExpanded}
            setExpandedIndex={setExpandedIndex}
            preview={(
                <>
                    <p className="truncate">{skill || "(Unspecified)"}</p>
                    <p className="text-sm">{level}</p>
                </>
            )}
        >
            <FormField
                control={form.control}
                name={`skills.${index}.skill`}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Skill</FormLabel>
                        <FormControl>
                            <Input {...field} placeholder='skill' />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name={`skills.${index}.level`}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Level</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value} >
                            <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a verified email to display" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {Object.values(SkillLevel).map((level) => (
                                    <SelectItem key={level} value={level}>{level}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </SortableItemMain>
    )
}

export default SkillItem
