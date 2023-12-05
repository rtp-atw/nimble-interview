import { string } from "yup";

export const emailValidator = string()
  .required("Please fill your email")
  .matches(
    /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i,
    "Email must contain @ and not allow for +"
  );

export const passwordValidator = string()
  .min(8, "Please must be at least 8 characters")
  .matches(/[a-zA-Z]/, "Please must have 1 characters")
  .matches(/\d/, "Please must have 1 number");
