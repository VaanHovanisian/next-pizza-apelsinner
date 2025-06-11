"use client";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckoutAside } from "@/components";
import {
  CheckoutAddressForm,
  CheckoutCart,
  CheckoutPersonalForm,
} from "@/components/checkout";
import { Title } from "@/components/ui";
import { checkoutFormSchema } from "@/constants/checkout-form-schema";
import { CheckoutFormValues } from "@/@types/checkout";

export default function CheckoutPage() {
  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      email: "",
      phone: "",
      firstName: "",
      lastName: "",
      address: "",
      comment: "",
    },
  });
  const onSubmit = (data: CheckoutFormValues) => {
    console.log(data);
  };
  return (
    <>
      <Title size={"l"} text={"Оформленние заказа"} />

      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex gap-10">
            <div className="flex flex-col gap-10 flex-1">
              <CheckoutCart />
              <CheckoutPersonalForm />
              <CheckoutAddressForm />
            </div>
            <div className="max-w-[400px] w-full">
              <CheckoutAside />
            </div>
          </div>
        </form>
      </FormProvider>
    </>
  );
}
