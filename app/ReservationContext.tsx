"use client";

import {
  createContext,
  useContext,
  ReactNode,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

interface ReservationContextValue {
  range: RangeDate;
  setRange: Dispatch<SetStateAction<RangeDate>>;
  resetRange: () => void;
}
interface ReservationContextProvider {
  children: ReactNode;
}

export interface RangeDate {
  from: Date | undefined;
  to?: Date | undefined;
}

const ReservationContext = createContext<ReservationContextValue | null>(null);

export const ReservationContextProvider = ({
  children,
}: ReservationContextProvider) => {
  const [range, setRange] = useState<RangeDate>({
    from: undefined,
    to: undefined,
  });

  const resetRange = () => {
    setRange({
      from: undefined,
      to: undefined,
    });
  };

  const ctx: ReservationContextValue = {
    range,
    setRange,
    resetRange,
  };

  return (
    <ReservationContext.Provider value={ctx}>
      {children}
    </ReservationContext.Provider>
  );
};
export const useReservationContext = () => {
  const context = useContext(ReservationContext);

  if (context === null) {
    throw new Error("context was used outside of the provider");
  }

  return context;
};
