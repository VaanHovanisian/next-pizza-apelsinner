import React from "react";
import { cn } from "@/lib/utils";
import { Input } from "../ui";
import { ErrorText } from "../error-text";
import { ResetButton } from "../reset-button";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  name: string;
  required?: boolean;
  label?: string;
}

export const FormInput: React.FC<Props> = (props) => {
  const { className, label, name, required, ...inputProps } = props;
  return (
    <div className={cn("", className)}>
      {label && (
        <p className="font-medium mb-2">
          {label} {required && <i className="text-red font-bold">*</i>}
        </p>
      )}
      <div className="relative">
        <Input className="h-12 text-md w-full" name={name} {...inputProps} />
        <ResetButton />
      </div>
      <ErrorText text="Поле обязательно для заполнения" className="mt-2" />
    </div>
  );
};
