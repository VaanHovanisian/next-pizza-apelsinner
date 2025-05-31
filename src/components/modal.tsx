"use client";

import React from "react";
import { Dialog } from "./ui";
import { DialogContent, DialogTitle } from "./ui/dialog";
import { Product } from "./product";
import { useRouter } from "next/navigation";
import { ProductRelation } from "@/@types/prisma";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  product: ProductRelation;
}

export const Modal: React.FC<Props> = (props) => {
  const { className, product } = props;
  const router = useRouter();
  return (
    <Dialog
      open={!!product}
      onOpenChange={() => {
        router.back();
      }}
    >
      <DialogTitle></DialogTitle>
      <DialogContent
        className={cn(
          "lg:max-w-screen-xl overflow-y-scroll max-h-screen z-1000",
          className
        )}
      >
        <Product product={product} />
      </DialogContent>
    </Dialog>
  );
};
