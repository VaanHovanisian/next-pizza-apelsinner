import React from "react";
import { cn } from "@/lib/utils";
import { Input, Textarea } from "../ui";
import { WhiteBox } from "../white-box";

interface Props {
  className?: string;
}

export const CheckoutAddressForm: React.FC<Props> = (props) => {
  const { className } = props;
  return (
    <WhiteBox className={cn("", className)} title="3. адрес доставки">
      <div className="flex flex-col gap-5">
        <Input
          name="firstName"
          className="text-base"
          placeholder="Адрес доставки"
        />
        <Textarea
          rows={5}
          className="text-base"
          placeholder="комментарий к заказу"
        />
      </div>
    </WhiteBox>
  );
};
