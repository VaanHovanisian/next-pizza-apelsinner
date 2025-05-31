import React from 'react';
import { Button, Title } from './ui';
import { Ingredient } from '@prisma/client';
import { cn } from '@/lib/utils';

interface Props {
     className?: string;
     imgUrl: string;
     name: string;
     ingredients?: Ingredient[];
     price: number;
}

export const ProductForm: React.FC<Props> = (props) => {
     const {className, imgUrl, name, price, ingredients} = props;
     return (
        <div className={cn("flex gap-5", className)}>
            <img src={imgUrl} alt={name} width={450} height={450}/>
            <div className='grid bg-gray-200'>
            <Title size={'s'} text={name}/>
            <p className='text-gray-400'>Lorem, ipsum dolor.</p>
            <p>{ingredients?.map(el => el.name).join(", ")}</p>
            <Button className='mt-auto' >В корзину{price} RUB</Button>
            </div>
        </div>
    );
}
