import * as yup from "yup";

export const quickRegisterSchema = yup.object({
  text: yup
    .string()
    .trim()
    .required("Escribe o dicta lo que pasó")
    .min(5, "Cuéntame un poquito más"),
});

export type QuickRegisterValues = yup.InferType<typeof quickRegisterSchema>;
