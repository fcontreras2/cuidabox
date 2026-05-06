import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
  email: yup.string().email().required(),
});

type FormValues = yup.InferType<typeof schema>;

export function useResetPassword() {
  const [sent, setSent] = useState(false);

  const methods = useForm<FormValues>({ resolver: yupResolver(schema) });

  const onSubmit = methods.handleSubmit(async () => {
    // TODO: conectar con endpoint de reset password
    setSent(true);
  });

  return { methods, onSubmit, sent };
}
