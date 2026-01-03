// components/ui/date-picker-string.tsx
"use client";

import * as React from "react";
import { format, parseISO } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface DatePickerStringProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  error?: string;
  required?: boolean;
  className?: string;
  disabled?: boolean;
  minDate?: string;
  maxDate?: string;
}

export const DatePickerString: React.FC<DatePickerStringProps> = ({
  value,
  onChange,
  label,
  placeholder = "Pick a date",
  error,
  required = false,
  className,
  disabled = false,
  minDate,
  maxDate,
}) => {
  const [date, setDate] = React.useState<Date | undefined>(value ? parseISO(value) : undefined);

  const handleSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    if (selectedDate) {
      onChange(format(selectedDate, "yyyy-MM-dd"));
    } else {
      onChange("");
    }
  };

  const minDateObj = minDate ? parseISO(minDate) : undefined;
  const maxDateObj = maxDate ? parseISO(maxDate) : undefined;

  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            disabled={disabled}
            className={cn(
              "w-full h-10 justify-start gap-2 px-3 font-normal text-left",
              "bg-white border border-gray-300",
              "hover:border-[#8F87F1]",
              "focus-visible:ring-2 focus-visible:ring-[#8F87F1]",
              !date && "text-gray-400",
              error && "border-red-500 focus-visible:ring-red-500",
              disabled && "opacity-50 cursor-not-allowed"
            )}
          >
            <CalendarIcon className="h-4 w-4 text-[#8F87F1]" />
            {date ? format(date, "PPP") : <span>{placeholder}</span>}
          </Button>
        </PopoverTrigger>

        <PopoverContent align="start" className="w-auto p-0 bg-white border border-gray-200 shadow-lg rounded-xl">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleSelect}
            initialFocus
            disabled={(date) => {
              if (minDateObj && date < minDateObj) return true;
              if (maxDateObj && date > maxDateObj) return true;
              return false;
            }}
            className="p-3"
            classNames={{
              day_selected: "bg-[#8F87F1] text-white hover:bg-[#8F87F1] focus:bg-[#8F87F1]",
              day_today: "border border-[#C68EFD] text-[#8F87F1] font-semibold",
              day: "hover:bg-[#C68EFD]/20 rounded-md transition-colors",
              head_cell: "text-gray-500 font-medium text-sm",
              cell: "text-gray-900",
              nav_button: "hover:bg-[#C68EFD]/20 rounded-md",
            }}
          />
        </PopoverContent>
      </Popover>

      {error && (
        <p className="text-sm text-red-600 flex items-center gap-1">
          <span>⚠</span>
          {error}
        </p>
      )}
    </div>
  );
};
