import { FC } from "react";
import CabinCard from "@/app/_components/CabinCard";
import { Cabin } from "../_interfaces/Cabin.interface";
import { getCabins } from "../_lib/data-service";
import { unstable_noStore as noStore } from "next/cache";

interface CabinListProps {}
const CabinList: FC<CabinListProps> = async ({}) => {
  // noStore();

  // CHANGE
  const cabins: Cabin[] = await getCabins();

  if (!cabins.length) return null;

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
      {cabins.map((cabin) => (
        <CabinCard
          cabin={cabin}
          key={cabin.id}
        />
      ))}
    </div>
  );
};

export default CabinList;
