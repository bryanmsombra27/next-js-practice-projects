"use client";

import { FC, useOptimistic } from "react";
import ReservationCard from "./ReservationCard";
import { Booking } from "../_interfaces/Booking.interface";
import { deleteReservation } from "../_lib/actions";

interface ReservationListProps {
  bookings: Booking[];
}
const ReservationList: FC<ReservationListProps> = ({ bookings }) => {
  const [optimisticBookings, optimisticDelete] = useOptimistic<
    Booking[],
    number
  >(bookings, (state, bookingId) => {
    return state.filter((booking) => booking.id !== bookingId);
  });

  const handleDelete = async (bookingId: number) => {
    optimisticDelete(bookingId);
    await deleteReservation(bookingId);
  };

  return (
    <ul className="space-y-6">
      {optimisticBookings.map((booking) => (
        <ReservationCard
          booking={booking}
          key={booking.id}
          onDelete={handleDelete}
        />
      ))}
    </ul>
  );
};

export default ReservationList;
