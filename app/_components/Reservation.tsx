import { FC } from "react";
import DateSelector from "./DateSelector";
import ReservationForm from "./ReservationForm";
import { getBookedDatesByCabinId, getSettings } from "../_lib/data-service";
import { Cabin } from "../_interfaces/Cabin.interface";

interface ReservationProps {
  cabin: Cabin;
}
const Reservation: FC<ReservationProps> = async ({ cabin }) => {
  const [settings, bookedDates] = await Promise.all([
    getSettings(),
    getBookedDatesByCabinId(cabin.id),
  ]);

  return (
    <div className="grid grid-cols-2 border border-primary-800 min-h-[400px]">
      <DateSelector
        bookedDates={bookedDates}
        cabin={cabin}
        settings={settings}
      />
      <ReservationForm cabin={cabin} />
    </div>
  );
};

export default Reservation;
