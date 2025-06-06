import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui';
import { ArrowUpDown } from 'lucide-react';

interface Props {
     className?: string;
}

export const SortPopup: React.FC<Props> = (props) => {
     const {className} = props;
     return (
        <Select defaultValue='popular'>
            <SelectTrigger className='flex items-center gap-2 bg-white'>
                <ArrowUpDown size={16}/>
                <span>Сортировка:</span>
                <span className='text-primary'><SelectValue/></span>
            </SelectTrigger>
            <SelectContent>
                <SelectItem value='popular'>рейтингу</SelectItem>
                <SelectItem value='price'>price</SelectItem>
            </SelectContent>
        </Select>
    );
}