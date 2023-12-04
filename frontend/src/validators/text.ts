import { string } from "yup";

export const emailValidator = string()
  .required("require.email")
  .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i, "email_format");
//   .when("type", {
//     is: (type: string) => type === "email",
//     then: (schema) =>
//       schema
//         .required("require.email")
//         .matches(
//           /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
//           "require.email_format"
//         ),
//   });

export const passwordValidator = string()
  .min(8, "password_min_eight")
  .matches(/[a-zA-Z]/, "password_char_num_required")
  .matches(/\d/, "password_char_num_required");
