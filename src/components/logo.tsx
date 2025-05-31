import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface Props {
  className?: string;
}

export const Logo: React.FC<Props> = ({ className }) => {
  return (
    <Link href='/'
      className={cn(
        'grid grid-cols-[35px_auto] gap-x-[15px] leading-none items-center',
        className
      )}
    >
      <Image
        src="/logo.png"
        width={35}
        height={35}
        alt="logo image"
        className="col-span-1 row-span-2 self-start"
      />
      <b className="col-start-2 row-start-1 text-[24px] font-black text-black font-nunito">
        NEXT PIZZA
      </b>
      <span className="col-start-2 row-start-2 text-[16px] text-[#7b7b7b] font-normal font-nunito">
        вкусней уже некуда
      </span>
    </Link>
  );
};
