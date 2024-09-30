import { FC, ReactNode } from "react";
import SideNavigation from "@/app/_components/SideNavigation";

interface layoutProps {
  children: ReactNode;
}
const layout: FC<layoutProps> = ({ children }) => {
  return (
    <>
      <div className="grid grid-cols-[16rem_1fr] h-full gap-12">
        <SideNavigation />
        <div className="py-1"> {children}</div>
      </div>
    </>
  );
};

export default layout;
