import { Metadata } from "next";
import { FC } from "react";

export const metadata: Metadata = {
  title: "About",
  description: "",
};

interface pageProps {}
const page: FC<pageProps> = ({}) => {
  return <h1>Component</h1>;
};

export default page;
