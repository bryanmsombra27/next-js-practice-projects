import { FC } from "react";
import DateSelector from "./DateSelector";
import ReservationForm from "./ReservationForm";
import { getBookedDatesByCabinId, getSettings } from "../_lib/data-service";
import { Cabin } from "../_interfaces/Cabin.interface";
import { auth } from "../_lib/auth";
import LoginMessage from "./LoginMessage";

interface ReservationProps {
  cabin: Cabin;
}
const Reservation: FC<ReservationProps> = async ({ cabin }) => {
  const [settings, bookedDates] = await Promise.all([
    getSettings(),
    getBookedDatesByCabinId(cabin.id),
  ]);
  const session = await auth();

  return (
    <div className="grid grid-cols-2 border border-primary-800 min-h-[400px]">
      <DateSelector
        bookedDates={bookedDates}
        cabin={cabin}
        settings={settings}
      />
      {session?.user ? (
        <ReservationForm
          user={session.user}
          cabin={cabin}
        />
      ) : (
        <LoginMessage />
      )}
    </div>
  );
};

export default Reservation;
