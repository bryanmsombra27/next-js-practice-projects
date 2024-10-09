import { FC } from "react";
import Spinner from "@/app/_components/Spinner";

interface loadingProps {}
const loading: FC<loadingProps> = ({}) => {
  return (
    <div className="grid items-center justify-center">
      <Spinner />
      <p className="text-xl text-primary-200">Loading Cabin data...</p>
    </div>
  );
};

export default loading;
