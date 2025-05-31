"use client"

import { cn } from '@/lib/utils';
import React from 'react';
import Link from 'next/link';
import { Button } from './ui';
import { ChevronDown } from 'lucide-react';
import { useCategoryStore } from '@/store/category';
import { Category } from '@prisma/client';

interface Props {
     className?: string;
     items: Category[]
}

const categories = [
    {name:"Пиццы", id: 1}, 
    {name:"Мясные", id: 2}, 
    {name:"Острые", id: 3}, 
    {name:"Сладкие", id: 4}, 
    {name:"Вегетарианские", id: 5}, 
    {name:"С курицей", id: 6}
]




export const Categories: React.FC<Props> = (props) => {
     const {className, items} = props;
    const activeCategory = useCategoryStore((state) => state.activeCategory)

     return (
        <ul className={cn("flex items-center gap-2 bg-gray-100 rounded-2xl p-3", className)}>
            {items.map((item, index) => (
                <li key={item.id}>
                    <Link href={`#${item.name}`} className={cn('py-2 px-3 rounded-2xl', 
                        item.id === activeCategory && "bg-white text-primary"
                    )}>
                        {item.name}
                    </Link>
                </li>
            ))}
            {
                <Button variant="destructive" size="sm" className='bg-transparent text-black shadow-none'>
                    Ещё 
                    <ChevronDown size={16}/>    
                </Button>
            }
        </ul>
    );
}