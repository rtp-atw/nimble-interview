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
import { useProtectedAuth, useSignIn } from "@/hooks";

import { Input } from "@components/Inputs";
import { Button } from "@components/Button";
import {
  signInSchema,
  type SignInFormValue,
} from "@modules/Users/services/schema";

export const SignIn: FC = () => {
  useProtectedAuth();

  const router = useRouter();

  const { handleSignIn, loading: apiLoading } = useSignIn();

  const [errMessage, setErrMessage] = useState<string | undefined>();

  const handleSubmit = useCallback(
    async (
      values: SignInFormValue,
      formikHelpers: FormikHelpers<SignInFormValue>
    ) => {
      try {
        setErrMessage(undefined);
        const resp = await handleSignIn({
          email: values.email,
          password: values.password,
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
    [handleSignIn]
  );

  const formik = useFormik<SignInFormValue>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: signInSchema,
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
      id="sign-in"
      className={clsx(
        "flex flex-col flex-1 items-center justify-center ",
        "pt-4 lg:pt-14 pb-4"
      )}
    >
      <h2 className={clsx("mb-6", "font-semibold text-lg")}>Sign In</h2>
      <form
        onSubmit={formik.handleSubmit}
        className={clsx("mb-4", "w-full max-w-[320px]")}
      >
        <div className={clsx("grid grid-flow-row grid-cols-1", "gap-4")}>
          <Input
            id="sign-in-email"
            label="Email"
            labelOptions={{
              htmlFor: "sign-in-email",
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
          />
          <Input
            id="sign-in-password"
            label="Password"
            labelOptions={{
              htmlFor: "sign-in-password",
            }}
            placeholder="Please fill your password"
            name="password"
            type="password"
            autoComplete="current-password"
            onChange={handleFormChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            disabled={apiLoading}
            error={
              formik.errors.password && formik.touched.password
                ? (formik.errors.password as string)
                : undefined
            }
          />
        </div>

        {errMessage && (
          <p className={clsx("text-t2a-error", "mb-4", "text-sm text-center")}>
            {errMessage}
          </p>
        )}
        <Button
          round
          type="submit"
          disabled={apiLoading || isError || !formik.dirty}
          className="mt-6"
        >
          Sing In
        </Button>
      </form>

      <p
        className={clsx(
          "text-sm leading-normal font-bold",
          "text-center",
          "mb-10"
        )}
      >
        <Link
          href={{
            pathname: apiLoading ? "#" : "/users/signup",
            query: router.query,
          }}
          locale={router.locale}
          className="font-semibold leading-6 text-t2a-orange"
        >
          Go to sign-up
        </Link>
      </p>
    </div>
  );
};
