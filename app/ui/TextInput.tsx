import { cn } from "@/utils/cn";
import * as React from "react";

export interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  ({ label, error, icon, className, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1 w-full">
        {label && (
          <label className="text-sm font-medium text-text-secondary">
            {label}
          </label>
        )}

        <div className="relative w-full">
          <input
            ref={ref}
            className={cn(
              "h-10 w-full rounded-md px-3 text-sm",
              "bg-bg-input text-text-primary placeholder:text-text-muted",
              "border border-border-default",
              "focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-transparent",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              icon && "pr-10", // space for icon
              error && "border-status-error focus:ring-status-error",
              className,
            )}
            {...props}
          />

          {icon && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              {icon}
            </span>
          )}
        </div>

        {error && <p className="text-xs text-status-error">{error}</p>}
      </div>
    );
  },
);

TextInput.displayName = "TextInput";

export default TextInput;
