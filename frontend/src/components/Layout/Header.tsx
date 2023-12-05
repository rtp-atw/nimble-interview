import { FC } from "react";
import { Container } from "@components/Container";
import clsx from "clsx";
import Link from "next/link";
import { useProfile } from "@/hooks";

export const Header: FC = () => {
  const { mounted, userJWT, handleLogout } = useProfile();

  const isAuthenticated = mounted && !!userJWT;
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
                onClick={handleLogout}
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
