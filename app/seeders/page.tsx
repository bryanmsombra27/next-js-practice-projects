import { FC } from "react";
import { uploadData } from "../_data/seeder";

interface pageProps {}
const page: FC<pageProps> = async ({}) => {
  await uploadData();

  return <h1 className="font-3xl font-bold">SEEDER</h1>;
};

export default page;
