import React, { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "animated";
  size?: "sm" | "md" | "lg" | "xl" | "icon";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      children,
      disabled,
      type = "button",
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#8F87F1] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
      primary:
        "bg-gradient-to-r from-[#8F87F1] to-[#C68EFD] hover:from-[#7E76E0] hover:to-[#B57DE0] text-white shadow-lg hover:shadow-xl",
      secondary: "bg-[#8F87F1] hover:bg-[#7E76E0] text-white shadow-lg hover:shadow-xl",
      outline:
        "bg-transparent border-2 border-[#8F87F1] text-[#8F87F1] hover:bg-gradient-to-r from-[#8F87F1] to-[#C68EFD] hover:border-transparent hover:text-white shadow-md hover:shadow-lg",
      ghost: "bg-transparent hover:bg-[#8F87F1]/10 text-[#8F87F1] hover:text-[#7E76E0]",
      animated:
        "bg-gradient-to-r from-[#8F87F1] to-[#C68EFD] hover:from-[#7E76E0] hover:to-[#B57DE0] text-white shadow-lg hover:shadow-xl transform hover:scale-105",
    };

    const sizes = {
      sm: "py-2 px-4 text-sm rounded-lg",
      md: "py-3 px-6 text-base rounded-xl",
      lg: "py-4 px-8 text-lg rounded-xl",
      xl: "py-5 px-10 text-xl rounded-2xl",
      icon: "p-3 rounded-xl",
    };

    return (
      <button
        type={type}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          fullWidth && "w-full",
          isLoading && "cursor-wait",
          className
        )}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        )}

        {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}

        {children}

        {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
