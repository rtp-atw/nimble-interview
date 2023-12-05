import {
  useCallback,
  type FC,
  type ChangeEvent,
  useState,
  useMemo,
} from "react";
import clsx from "clsx";

import { useProfile, useProtectedAuth } from "@/hooks";
import { useUploadKeywords } from "@/hooks/Keyword";

import { useFormik } from "formik";

import { Input } from "@components/Inputs";
import { Button } from "@/src/components/Button";

import { uploadSchema } from "@modules/Users/services/schema";

export const Upload: FC = () => {
  useProtectedAuth();

  const { userJWT } = useProfile();

  const [inputKey, setInputKey] = useState(Date.now());

  const { handleUpload: hookHandleUpload, loading: apiLoading } =
    useUploadKeywords();

  const handleSubmit = (values: { keywords: File | null }) => {
    if (!values.keywords) return;
    hookHandleUpload({
      file: values.keywords,
      jwt: userJWT,
    });
  };

  const formik = useFormik<{
    keywords: File | null;
  }>({
    initialValues: {
      keywords: null,
    },
    onSubmit: handleSubmit,
    validationSchema: uploadSchema,
    validateOnBlur: true,
  });

  const handleReset = useCallback(() => {
    formik.setFieldValue("keywords", null);
    setInputKey(Date.now());
  }, [formik]);

  const handleFormUpload = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files) return;
      if (!e.target.files[0]) return;

      formik.setFieldValue("keywords", e.target.files[0]);
    },
    [formik]
  );

  const isError = useMemo(() => {
    return Object.keys(formik.errors).length !== 0;
  }, [formik.errors]);

  return (
    <div
      id="sign-up"
      className={clsx(
        "flex flex-col flex-1 items-center justify-center ",
        "pt-4 lg:pt-14 pb-4"
      )}
    >
      <h2 className={clsx("mb-6", "font-semibold text-lg")}>
        Upload Your Keywords
      </h2>
      <div className={clsx("my-4")}>
        <form
          className="flex flex-col gap-y-4 items-center"
          onSubmit={formik.handleSubmit}
        >
          <div>
            <div className="flex gap-x-4 items-center">
              <Input
                id="keyword-file"
                name="keywords"
                type="file"
                onChange={handleFormUpload}
                key={inputKey}
                round={false}
                className="rounded-lg"
                error={
                  formik.errors.keywords && formik.touched.keywords
                    ? (formik.errors.keywords as string)
                    : undefined
                }
              />
              <Button
                small
                block={false}
                onClick={handleReset}
                className="h-fit"
              >
                Clear
              </Button>
            </div>
            <p
              className={clsx(
                "text-gray-500 text-sm",
                "transition-all",
                isError && "mt-2"
              )}
            >
              *CSV format (,) only
            </p>
          </div>
          <Button
            type="submit"
            disabled={apiLoading || isError || !formik.dirty}
            className="max-w-[140px]"
          >
            Upload
          </Button>
        </form>
      </div>

      <div>Table</div>
    </div>
  );
};
