import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "@/i18n/navigation";
import * as yup from "yup";
import { authClient } from "@cuidabox/api";

const schema = yup.object({
  name: yup.string().min(2).required(),
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
});

type FormValues = yup.InferType<typeof schema>;

export function useSignUp() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  const methods = useForm<FormValues>({ resolver: yupResolver(schema) });

  const onSubmit = methods.handleSubmit(async ({ name, email, password }) => {
    setServerError(null);
    try {
      await authClient.register(name, email, password);
      router.push("/patient");
    } catch {
      setServerError("emailTaken");
    }
  });

  return { methods, onSubmit, serverError };
}
