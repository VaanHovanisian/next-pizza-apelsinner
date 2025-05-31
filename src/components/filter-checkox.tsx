import React from 'react';
import { Checkbox } from './ui';
import { cn } from '@/lib/utils';

interface Props {
     className?: string;
     text: string;
     value: string;
     checked?: boolean;
     onCkeckedChange?: (checked: boolean) => void;
}

export const FilterCheckox: React.FC<Props> = (props) => {
     const {className, text, value, checked, onCkeckedChange} = props;
     return (
        <label className={cn("flex items-center gap-2",className )}>
            <Checkbox value={value} checked={checked} onCheckedChange={onCkeckedChange}/>
            {text}  
        </label>
    );
}