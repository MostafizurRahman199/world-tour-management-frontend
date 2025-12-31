// components/ui/custom-select.tsx
"use client";

import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface CustomSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: Array<{ _id: string; name: string }>;
  placeholder?: string;
  label?: string;
  error?: string;
  loading?: boolean;
  disabled?: boolean;
  required?: boolean;
  className?: string;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
  value,
  onChange,
  options,
  placeholder = "Select an option",
  label,
  error,
  loading = false,
  disabled = false,
  required = false,
  className,
}) => {
  const selectedOption = options.find((option) => option._id === value);

  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <DropdownMenu>
        <DropdownMenuTrigger asChild disabled={disabled || loading}>
          <button
            className={cn(
              "flex h-10 w-full items-center justify-between rounded-lg border bg-white px-3 py-2 text-sm  transition-colors",
              "border-gray-300 hover:border-gray-400",
              "focus:outline-none focus:ring-2 focus:ring-[#8F87F1] focus:border-transparent",
              error && "border-red-500 focus:ring-red-500",
              !value && "text-gray-500",
              disabled && "cursor-not-allowed opacity-50"
            )}
          >
            <span className="truncate">{loading ? "Loading..." : selectedOption?.name || placeholder}</span>
            <ChevronDown className={cn("h-4 w-4 transition-transform duration-200", disabled && "opacity-50")} />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-full max-h-60 overflow-y-auto rounded-lg border border-gray-200 bg-white p-1 shadow-lg"
          align="start"
        >
          <DropdownMenuLabel className="px-2 py-1.5 text-sm font-semibold text-gray-700">
            {placeholder}
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="my-1 border-gray-200" />
          {loading ? (
            <div className="flex items-center justify-center px-2 py-3">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-[#8F87F1] border-t-transparent"></div>
              <span className="ml-2 text-sm text-gray-500">Loading...</span>
            </div>
          ) : options.length === 0 ? (
            <div className="px-2 py-3 text-center text-sm text-gray-500">No options available</div>
          ) : (
            options.map((option) => (
              <DropdownMenuItem
                key={option._id}
                onClick={() => onChange(option._id)}
                className={cn(
                  "relative flex cursor-pointer select-none items-center rounded-md px-2 py-2 text-sm outline-none transition-colors",
                  "hover:bg-[#8F87F1]/10 hover:text-[#8F87F1]",
                  "focus:bg-[#8F87F1]/10 focus:text-[#8F87F1]",
                  value === option._id && "bg-[#8F87F1]/10 text-[#8F87F1] font-medium"
                )}
              >
                <span className="flex-1 truncate">{option.name}</span>
                {value === option._id && <Check className="ml-2 h-4 w-4 flex-shrink-0 text-[#8F87F1]" />}
              </DropdownMenuItem>
            ))
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {error && (
        <p className="text-sm text-red-600 flex items-center gap-1">
          <span>⚠</span>
          {error}
        </p>
      )}
      {loading && !error && (
        <p className="text-sm text-gray-500 flex items-center gap-1">
          <span className="h-2 w-2 animate-pulse rounded-full bg-gray-400"></span>
          Loading options...
        </p>
      )}
    </div>
  );
};
