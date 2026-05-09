import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import * as yup from "yup";
import { authClient } from "@cuidabox/api";
import { useRouter } from "@/i18n/navigation";

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
});

type FormValues = yup.InferType<typeof schema>;

export function useSignIn() {
  const router = useRouter();
  const methods = useForm<FormValues>({ resolver: yupResolver(schema) });

  const { mutate: login, error } = useMutation({
    mutationFn: ({ email, password }: FormValues) =>
      authClient.login(email, password),
    onSuccess: () => {
      router.push("/");
    },
  });

  const onSubmit = methods.handleSubmit((values) => login(values));

  const serverError = error ? "invalid" : null;

  return { methods, onSubmit, serverError };
}
