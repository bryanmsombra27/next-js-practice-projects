import { FC } from "react";
import Logo from "@/app/_components/Logo";
import Navigation from "@/app/_components/Navigation";

interface HeaderProps {}
const Header: FC<HeaderProps> = ({}) => {
  return (
    <header className="border-b border-primary-900 px-8 py-5">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <Logo />
        <Navigation />
      </div>
    </header>
  );
};

export default Header;
