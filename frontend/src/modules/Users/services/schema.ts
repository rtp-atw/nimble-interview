import { object, string, ref, type InferType, boolean } from "yup";

import { emailValidator, passwordValidator } from "@/src/validators";

export const regExpName = new RegExp(
  /^\p{L}+(?:[\s-]\p{L}+)+(\s\p{N}*\p{L}*)?$/,
  "u"
);

export const signInSchema = object({
  email: emailValidator,
  password: string().min(8, "password_min_eight").required("require.password"),
});

export const signUpSchema = object({
  email: emailValidator,
  password: passwordValidator.required("require.password"),
  confirm_password: passwordValidator
    .oneOf([ref("password")], "password_not_match")
    .required("require.confirm_password"),
});

export type SignInFormValue = InferType<typeof signInSchema>;
export type SignUpFormValue = InferType<typeof signUpSchema>;
