import { Metadata } from "next";
import { FC } from "react";

export const metadata: Metadata = {
  title: "Guests Area",
  description: "",
};

interface pageProps {}
const page: FC<pageProps> = ({}) => {
  return (
    <>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Welcome Bryan
      </h2>
    </>
  );
};

export default page;
