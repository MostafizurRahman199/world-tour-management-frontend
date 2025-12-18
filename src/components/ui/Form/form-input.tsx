// src/components/ui/Form/form-input.tsx
import { forwardRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(({ className, label, error, icon, ...props }, ref) => {
  return (
    <div className="space-y-2 ">
      {label && (
        <Label htmlFor={props.id} className="text-sm font-medium text-gray-900">
          {label}
        </Label>
      )}
      <div className="relative">
        {icon && <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">{icon}</div>}
        <Input
          className={cn(
            "py-6",
            icon ? "pl-10" : "",
            error
              ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
              : "border-gray-300 focus:border-[#8F87F1] focus:ring-2 focus:ring-[#8F87F1]/20",
            "w-full transition-all duration-200 bg-white text-gray-900 placeholder:text-gray-500",
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
});

FormInput.displayName = "FormInput";

export { FormInput };
