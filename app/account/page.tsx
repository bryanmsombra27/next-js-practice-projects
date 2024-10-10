import { Metadata } from "next";
import { FC } from "react";
import { auth } from "../_lib/auth";

export const metadata: Metadata = {
  title: "Guests Area",
  description: "",
};

interface pageProps {}
const page: FC<pageProps> = async ({}) => {
  const session = await auth();

  return (
    <>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Welcome {session?.user?.name}
      </h2>
    </>
  );
};

export default page;
