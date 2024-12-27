import React, { useEffect } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { EditorFormProps } from '@/lib/types';
import { UseFormReturn } from 'react-hook-form';
import { GeneralInfoValues } from '@/lib/schema.zod';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';


interface FieldsOrderProps {
    form: UseFormReturn<GeneralInfoValues>;
}

const MarginSection = ({ form }: FieldsOrderProps) => {
    return (

        <div className="space-y-4">
            <h3 className="text-lg font-semibold text-center">Margins</h3>
            <div className="grid grid-cols-2 gap-4">
                {["top", "bottom", "left", "right"].map((side) => (
                    <FormField
                        key={side}
                        control={form.control}
                        name={`margins.${side as 'top' | 'bottom' | 'left' | 'right'}`}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{side.charAt(0).toUpperCase() + side.slice(1)} Margin</FormLabel>
                                <FormControl>
                                    <Select onValueChange={(val) => field.onChange(+val)} defaultValue={`${field.value}`}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {[10, 20, 30, 40, 50, 60, 70, 80].map((val) => (
                                                <SelectItem key={val} value={`${val}`}>
                                                    {val}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                ))}
            </div>
            {/* <FormField
                control={form.control}
                name="margins.unit"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Unit</FormLabel>
                        <FormControl>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select unit" />
                                </SelectTrigger>
                                <SelectContent>
                                    {["px", "mm", "cm"].map((unit) => (
                                        <SelectItem key={unit} value={unit}>
                                            {unit.toUpperCase()}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            /> */}
        </div>

    )
}

export default MarginSection
