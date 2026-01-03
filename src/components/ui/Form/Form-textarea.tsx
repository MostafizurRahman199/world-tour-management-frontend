// src/components/ui/Form/form-textarea.tsx
import { forwardRef } from "react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";


interface FormTextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  rows?: number;
}

const FormTextArea = forwardRef<HTMLTextAreaElement, FormTextAreaProps>(
  ({ className, label, error, icon, rows = 3, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <Label htmlFor={props.id} className="text-sm font-medium text-gray-900">
            {label}
          </Label>
        )}
        <div className="relative">
          {icon && <div className="absolute left-3 top-3 text-gray-500">{icon}</div>}
          <textarea
            ref={ref}
            rows={rows}
            className={cn(
              "w-full px-3 py-2 border rounded-md transition-all duration-200 bg-white text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2",
              icon ? "pl-10" : "",
              error
                ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                : "border-gray-300 focus:border-[#8F87F1] focus:ring-[#8F87F1]/20",
              "resize-y min-h-[80px]", // Minimum height for better UX
              className
            )}
            {...props}
          />
        </div>
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

FormTextArea.displayName = "FormTextArea";

export { FormTextArea };
