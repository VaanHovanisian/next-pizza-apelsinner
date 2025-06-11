import { z } from "zod";

export const checkoutFormSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "имя должно содержать не менее 2 символов" }),
  lastName: z
    .string()
    .min(2, { message: "фамилия должно содержать не менее 2 символов" }),
  email: z.string().email({ message: "введите корректную почту" }),
  phone: z.string().min(10, { message: "введите корректный номер телефона" }),
  address: z.string().min(10, { message: "введите корректный адрес" }),
  comment: z.string().optional(),
});
