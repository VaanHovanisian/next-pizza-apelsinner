import { cn } from "@/lib/utils";
import { SearchIcon } from "lucide-react";
import React from "react";
import { Input } from "./ui";

interface Props {
  className?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  onFocus?: () => void;
}

export const Search: React.FC<Props> = (props) => {
  const { className, value, onChange, placeholder, onFocus } = props;
  return (
    <label
      className={cn(
        "flex items-center gap-2 bg-gray-100 rounded-2xl",
        className
      )}
    >
      <SearchIcon size={16} className="text-gray-400" />
      <Input
        value={value}
        type="text"
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        onFocus={onFocus}
      />
    </label>
  );
};
