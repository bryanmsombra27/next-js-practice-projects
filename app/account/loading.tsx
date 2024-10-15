import { FC } from "react";
import Spinner from "@/app/_components/Spinner";

interface loadingProps {}
const loading: FC<loadingProps> = ({}) => {
  return <Spinner />;
};

export default loading;
