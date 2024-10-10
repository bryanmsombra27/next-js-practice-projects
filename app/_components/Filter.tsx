"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FC, ReactNode } from "react";

interface FilterProps {}
const Filter: FC<FilterProps> = ({}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const activeFilter = searchParams.get("capacity") ?? "all";

  const handleFilter = (filter: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("capacity", filter);

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="border border-primary-800 flex">
      <Button
        handleFilter={handleFilter}
        activeFilter={activeFilter}
        filter="all"
      >
        All cabins
      </Button>
      <Button
        handleFilter={handleFilter}
        activeFilter={activeFilter}
        filter="small"
      >
        1&mdash; 3 guests
      </Button>
      <Button
        handleFilter={handleFilter}
        activeFilter={activeFilter}
        filter="medium"
      >
        1&mdash; 7 guests
      </Button>
      <Button
        handleFilter={handleFilter}
        filter="large"
        activeFilter={activeFilter}
      >
        1&mdash; 12 guests
      </Button>
    </div>
  );
};
interface ButtonProps {
  handleFilter: (filter: string) => void;
  children: ReactNode;
  activeFilter: string;
  filter: string;
}

const Button = ({
  handleFilter,
  children,
  activeFilter,
  filter,
}: ButtonProps) => {
  return (
    <button
      className={`px-5 py-2 hover:bg-primary-700  ${
        activeFilter == filter ? "bg-primary-700 text-primary-50 " : ""
      } `}
      onClick={() => handleFilter(filter)}
    >
      {children}
    </button>
  );
};

export default Filter;
