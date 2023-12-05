import { useCallback, type FC, type ChangeEvent, useState } from "react";
import clsx from "clsx";

import { useProfile, useProtectedAuth } from "@/hooks";
import { useUploadKeywords } from "@/hooks/Keyword";

import { Input } from "@components/Inputs";
import { Button } from "@/src/components/Button";

export const Upload: FC = () => {
  useProtectedAuth();

  const { userJWT } = useProfile();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [inputKey, setInputKey] = useState(Date.now());

  const { handleUpload: hookHandleUpload, loading } = useUploadKeywords();

  const handleUpload = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    if (!e.target.files[0]) return;

    setSelectedFile(e.target.files[0]);
  }, []);

  const handleReset = useCallback(() => {
    setSelectedFile(null);
    setInputKey(Date.now());
  }, []);

  const handleSubmit = () => {
    if (!selectedFile) return;
    hookHandleUpload({
      file: selectedFile,
      jwt: userJWT,
    });
  };

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
          onSubmit={handleSubmit}
        >
          <div>
            <div className="flex gap-x-4 items-center">
              <Input
                type="file"
                onChange={handleUpload}
                key={inputKey}
                round={false}
                className="rounded-lg"
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
            <p className="text-gray-500 text-sm ">*CSV format (,) only</p>
          </div>
          <Button type="submit" className="max-w-[140px]">
            Upload
          </Button>
        </form>
      </div>

      <div>Table</div>
    </div>
  );
};
