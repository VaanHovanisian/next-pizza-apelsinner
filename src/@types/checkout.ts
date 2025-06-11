import { z } from "zod";
import { checkoutFormSchema } from "@/constants/checkout-form-schema";
export type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;
