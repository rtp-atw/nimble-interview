import { FC, useEffect, useState } from "react";
import Link from "next/link";
import clsx from "clsx";

import { useContext } from "react";

import { AuthenticationContext } from "@/src/contexts/Authentication";

import { Container } from "@components/Container";

export const Header: FC = () => {
  const ctx = useContext(AuthenticationContext);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isAuthenticated = mounted && !!ctx.jwt;

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
            {isAuthenticated && (
              <>
                <Link
                  href="/users/reports"
                  className={clsx(
                    "cursor-pointer",
                    "font-semibold hover:text-blue-500"
                  )}
                >
                  Reports
                </Link>
                <Link
                  href="/users/upload"
                  className={clsx(
                    "cursor-pointer",
                    "font-semibold hover:text-blue-500"
                  )}
                >
                  Upload
                </Link>
              </>
            )}
            {!isAuthenticated && (
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
            {isAuthenticated && (
              <span
                onClick={ctx.onLogout}
                className={clsx(
                  "cursor-pointer",
                  "font-semibold hover:text-blue-500"
                )}
              >
                Logout
              </span>
            )}
          </div>
        </Container>
      </header>
    </>
  );
};

export default Header;
