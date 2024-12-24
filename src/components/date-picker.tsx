import React from 'react'
import Datepicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type Props = {
    selected?: string;
    onChange: (date: string) => void;
    startDate?: string;
    endDate?: string;
    placeholder?: string;
}

const DatePicker = ({
    selected,
    onChange,
    startDate,
    endDate,
    placeholder,
}: Props) => {

    return (
        <Datepicker
            selected={selected ? new Date(selected) : undefined}
            showMonthYearPicker
            dateFormat="MMM, yyyy"
            onChange={(date) => onChange(date?.toISOString() ?? "")}
            minDate={startDate ? new Date(startDate) : undefined}
            maxDate={endDate ? new Date(endDate) : undefined}
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
            placeholderText={placeholder}
        />
    );
};

export default DatePicker