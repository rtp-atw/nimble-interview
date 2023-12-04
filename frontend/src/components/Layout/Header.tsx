import { FC } from "react";
import { Container } from "@components/Container";

export const Header: FC = () => {
  const handleSignIn = () => {};

  const handleSignUp = () => {};
  return (
    <>
      <header className="bg-gray-25 border-b border-gray-25 ">
        <Container className="min-h-[52px]">Header</Container>
      </header>
    </>
  );
};

export default Header;
