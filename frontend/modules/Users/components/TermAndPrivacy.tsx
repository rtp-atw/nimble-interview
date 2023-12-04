import { type FC } from "react";
import Link from "next/link";
import clsx from "clsx";

import { useTranslation } from "next-i18next";

type TermAndPrivacyProps = {
  className?: string;
  loading?: boolean;
};
export const TermAndPrivacy: FC<TermAndPrivacyProps> = ({
  className,
  loading = false,
}) => {
  const { t } = useTranslation("account");
  return (
    <p
      className={clsx(
        "text-xs font-bold leading-normal",
        "text-center",
        className
      )}
    >
      {t("agreement.intro")}{" "}
      <Link
        href={loading ? "#" : "/terms-and-conditions"}
        className="font-semibold leading-6 text-t2a-blue underline"
      >
        {t("agreement.termsAndConditions")}
      </Link>{" "}
      &{" "}
      <Link
        href={loading ? "#" : "/privacy-policy"}
        className="font-semibold leading-6 text-t2a-blue underline"
      >
        {t("agreement.privacyPolicy")}
      </Link>
    </p>
  );
};
