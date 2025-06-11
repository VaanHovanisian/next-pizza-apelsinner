import React from "react";
import { cn } from "@/lib/utils";
import { WhiteBox } from "../white-box";
import { FormInput } from "../form";
import { Input } from "../ui";

interface Props {
  className?: string;
}

export const CheckoutPersonalForm: React.FC<Props> = (props) => {
  const { className } = props;
  return (
    <WhiteBox className={cn("", className)} title="2 персональные данные">
      <div className="grid grid-cols-2 gap-5">
        <Input name="firstName" className="text-base" placeholder="Имя" />
        <Input name="lastName" className="text-base" placeholder="Фамилие" />
        <Input name="email" className="text-base" placeholder="Email" />
        <Input name="phone" className="text-base" placeholder="Телефон" />
        <FormInput name={""} />
      </div>
    </WhiteBox>
  );
};
