import React from 'react';
import { Container } from './container';
import { Categories } from './categories';
import { SortPopup } from './sort-popup';
import { cn } from '@/lib/utils';
import { Category } from '@prisma/client';
import { categories } from '@/prisma/constants';

interface Props {
     className?: string;
     categories: Category[]
}

export const TopBar: React.FC<Props> = (props) => {
     const {className, categories} = props;
     return (
        <div className={cn("sticky top-2 z-100", className)}>
            <Container className='flex justify-between items-center'>
                <Categories items={categories}/>
                <SortPopup/>
            </Container>
        </div>
    );
}