import { FC } from "react";
import { Container } from "@components/Container";
import clsx from "clsx";
import Link from "next/link";
import { useProfile } from "@/hooks";

export const Header: FC = () => {
  const { profile } = useProfile();
  return (
    <>
      <header className="bg-gray-25 border-b shadow-8 ">
        <Container
          className={clsx("flex items-center justify-between", "min-h-[58px]")}
        >
          <h1 className={clsx("text-2xl font-semibold")}>Nimble</h1>
          <div className={clsx("flex items-center justify-between", "gap-x-4")}>
            <Link
              href="/"
              className={clsx(
                "cursor-pointer",
                "font-semibold hover:text-blue-500"
              )}
            >
              Home
            </Link>
            <Link
              href="/upload"
              className={clsx(
                "cursor-pointer",
                "font-semibold hover:text-blue-500"
              )}
            >
              Upload
            </Link>
            {!profile && (
              <Link
                href="/users/sign-in"
                className={clsx(
                  "cursor-pointer",
                  "font-semibold hover:text-blue-500"
                )}
              >
                Sign In
              </Link>
            )}
            {profile && (
              <Link
                href="/api/logout"
                className={clsx(
                  "cursor-pointer",
                  "font-semibold hover:text-blue-500"
                )}
              >
                Logout
              </Link>
            )}
          </div>
        </Container>
      </header>
    </>
  );
};

export default Header;
