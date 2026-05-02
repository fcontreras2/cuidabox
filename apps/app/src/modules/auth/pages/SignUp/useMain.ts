import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import * as yup from "yup";
import { authClient } from "@cuidabox/api";

const schema = yup.object({
  name: yup.string().min(2).required(),
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
});

type FormValues = yup.InferType<typeof schema>;

export function useMain() {
  const router = useRouter();
  const locale = useLocale();
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm<FormValues>({ resolver: yupResolver(schema) });

  const onSubmit = form.handleSubmit(async ({ name, email, password }) => {
    setServerError(null);
    try {
      await authClient.register(name, email, password);
      router.push(`/${locale}/dashboard`);
    } catch {
      setServerError("emailTaken");
    }
  });

  return { form, onSubmit, serverError };
}
