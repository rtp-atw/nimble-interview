import {
  useCallback,
  useState,
  type ChangeEvent,
  type FC,
  useMemo,
} from "react";
import clsx from "clsx";
import Link from "next/link";
import { AxiosError } from "axios";

import { useRouter } from "next/router";
import { useFormik, type FormikHelpers } from "formik";
import { useProtectedAuth, useSignUp } from "@/hooks";

import { Input } from "@components/Inputs";
import { Button } from "@components/Button";
import {
  signUpSchema,
  type SignUpFormValue,
} from "@modules/Users/services/schema";

export const SignUp: FC = () => {
  useProtectedAuth();

  const router = useRouter();

  const { handleSignUp, loading: apiLoading } = useSignUp();

  const [errMessage, setErrMessage] = useState<string | undefined>();

  const handleSubmit = useCallback(
    async (
      values: SignUpFormValue,
      formikHelpers: FormikHelpers<SignUpFormValue>
    ) => {
      try {
        setErrMessage(undefined);
        const resp = await handleSignUp({
          email: values.email,
          password: values.confirm_password,
        });

        if (!resp) {
          return;
        }
      } catch (err: any) {
        if (!(err instanceof AxiosError)) return;
        if (!err.response) return;

        if (err.response.data.message) {
          setErrMessage(err.response.data.message);
          return;
        }
      }
    },
    [handleSignUp]
  );

  const formik = useFormik<SignUpFormValue>({
    initialValues: {
      email: "",
      password: "",
      confirm_password: "",
    },
    validationSchema: signUpSchema,
    onSubmit: handleSubmit,
    validateOnBlur: true,
  });

  const isError = useMemo(() => {
    return Object.keys(formik.errors).length !== 0;
  }, [formik.errors]);

  const handleFormChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      formik.handleChange(e);
      if (errMessage) setErrMessage(undefined);
    },
    [errMessage, formik]
  );

  return (
    <div
      id="sign-up"
      className={clsx(
        "flex flex-col flex-1 items-center justify-center ",
        "pt-4 lg:pt-14 pb-4"
      )}
    >
      <h2 className={clsx("mb-6", "font-semibold text-lg")}>Sign Up</h2>
      <form
        onSubmit={formik.handleSubmit}
        className={clsx("mb-4", "w-full max-w-[320px]")}
      >
        <div className={clsx("grid grid-flow-row grid-cols-1 ", "gap-4")}>
          <Input
            id="sign-up-email"
            label="Email"
            labelOptions={{
              htmlFor: "sign-up-email",
            }}
            placeholder="Please fill your email"
            name="email"
            type="email"
            autoComplete="email"
            onChange={handleFormChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            disabled={apiLoading}
            error={
              formik.errors.email && formik.touched.email
                ? (formik.errors.email as string)
                : undefined
            }
            round={false}
            className="rounded-lg"
          />
          <Input
            id="sign-up-password"
            label="Password"
            labelOptions={{
              htmlFor: "sign-up-password",
            }}
            placeholder="Please fill your password"
            name="password"
            type="password"
            autoComplete="new-password"
            onChange={handleFormChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            disabled={apiLoading}
            error={
              formik.errors.password && formik.touched.password
                ? (formik.errors.password as string)
                : undefined
            }
            round={false}
            className="rounded-lg"
          />
          <Input
            id="sign-up-confirm-password"
            label="Confirm password"
            labelOptions={{
              htmlFor: "sign-up-confirm-password",
            }}
            placeholder="Please fill confirm password"
            name="confirm_password"
            type="password"
            autoComplete="new-password"
            onChange={handleFormChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirm_password}
            disabled={apiLoading}
            error={
              formik.errors.confirm_password && formik.touched.confirm_password
                ? (formik.errors.confirm_password as string)
                : undefined
            }
            round={false}
            className="rounded-lg"
          />
        </div>
        {errMessage && (
          <p className={clsx("text-t2a-error", "mb-4", "text-sm text-center")}>
            {errMessage}
          </p>
        )}

        <Button
          type="submit"
          disabled={apiLoading || isError || !formik.dirty}
          className="mt-6"
        >
          Sign Up
        </Button>
      </form>

      <p
        className={clsx("text-sm leading-normal font-bold", "text-center mb-4")}
      >
        <Link
          href={{
            pathname: apiLoading ? "#" : "/users/signin",
            query: router.query,
          }}
          locale={router.locale}
          className={clsx("text-blue-500 hover:opacity-90")}
        >
          Go to Sign In
        </Link>
      </p>
    </div>
  );
};
