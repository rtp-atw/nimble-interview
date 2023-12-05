import { object, string, ref, type InferType, boolean } from "yup";

import { emailValidator, passwordValidator } from "@/src/validators";

export const regExpName = new RegExp(
  /^\p{L}+(?:[\s-]\p{L}+)+(\s\p{N}*\p{L}*)?$/,
  "u"
);

export const signInSchema = object({
  email: emailValidator,
  password: string()
    .min(8, "Please must be at least 8 characters")
    .required("Please fill your password"),
});

export const signUpSchema = object({
  email: emailValidator,
  password: passwordValidator.required("Please fill your password"),
  confirm_password: passwordValidator
    .oneOf([ref("password")], "Password not matched")
    .required("Please cofirm your password"),
});

export type SignInFormValue = InferType<typeof signInSchema>;
export type SignUpFormValue = InferType<typeof signUpSchema>;
