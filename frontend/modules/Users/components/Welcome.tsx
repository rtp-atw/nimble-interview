import clsx from "clsx";
import { useCallback, type FC, useMemo } from "react";
import Image from "next/image";

import { useTranslation } from "react-i18next";

import { TermAndPrivacy } from "./TermAndPrivacy";
import { Button } from "@/components/Button";
import { useRouter } from "next/router";
import { useConvertCart } from "@/hooks";

export const Welcome: FC = () => {
  useConvertCart();
  const { t } = useTranslation("account");
  const router = useRouter();

  const nextPath = useMemo(() => {
    const { next } = router.query;
    if (typeof next === "string") {
      if (next === "") {
        return "/";
      }
      return next;
    }
    return "/";
  }, [router.query]);

  const handleStart = useCallback(() => {
    window.location.href = nextPath;
  }, [router, nextPath]);

  return (
    <div className={clsx("grid grid-flow-row grid-cols-1", "gap-y-8")}>
      <Image
        src="/assets/welcome-sign-in.png"
        alt="Welcome to Ticket2Attraction"
        width={257}
        height={257}
        className="-mt-6 mx-auto "
        unoptimized
      />

      <div
        className={clsx("text-center", ["text-lg leading-normal font-normal"])}
      >
        <p className={clsx("mb-0", ["text-xl leading-normal font-bold"])}>
          {t("welcome.title")}
        </p>
        {t("welcome.sub_title")}
      </div>
      <p className={clsx("text-center ", ["font-bold"])}>
        {t("welcome.ads.1")}
        <br />
        {t("welcome.ads.2")}
        <br />
        {t("welcome.ads.3")}
      </p>
      <div className="mt-7">
        <TermAndPrivacy className="mb-3" />
        <Button round type="button" onClick={handleStart}>
          {t("actions.start")}
        </Button>
      </div>
    </div>
  );
};
