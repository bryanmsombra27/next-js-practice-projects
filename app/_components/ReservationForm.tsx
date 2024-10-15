"use client";

import { differenceInDays } from "date-fns";
import { User } from "../_interfaces/Auth.interface";
import { Cabin } from "../_interfaces/Cabin.interface";
import { useReservationContext } from "../ReservationContext";
import { createBooking } from "../_lib/actions";
import { BookingDraft } from "../_interfaces/Booking.interface";
import SubmitButton from "./SubmitButton";

interface ReservationFormProps {
  cabin: Cabin;
  user: User;
}

function ReservationForm({ cabin, user }: ReservationFormProps) {
  // CHANGE
  const { maxCapacity, regularPrice, discount, id } = cabin;

  const { range, resetRange } = useReservationContext();

  const startDate = range.from!;
  const endDate = range.to!;

  const numNights = differenceInDays(endDate, startDate);

  const cabinPrice = numNights * (regularPrice - discount);

  const bookingDate: BookingDraft = {
    startDate,
    endDate,
    numNights,
    totalPrice: cabinPrice,
    cabinId: id,
  };

  const createBookingWithData = createBooking.bind(null, bookingDate);

  return (
    <div className="scale-[1.01]">
      <div className="bg-primary-800 text-primary-300 px-16 py-2 flex justify-between items-center">
        <p>Logged in as</p>

        {user && (
          <div className="flex gap-4 items-center">
            <img
              // Important to display google profile images
              referrerPolicy="no-referrer"
              className="h-8 rounded-full"
              src={user.image!}
              alt={user.name!}
            />
            <p>{user.name}</p>
          </div>
        )}
      </div>

      <form
        className="bg-primary-900 py-10 px-16 text-lg flex gap-5 flex-col"
        // action={createBookingWithData}
        action={async (formData) => {
          await createBookingWithData(formData);
          resetRange();
        }}
      >
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            id="numGuests"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            required
          >
            <option
              value=""
              key=""
            >
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option
                value={x}
                key={x}
              >
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            id="observations"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            placeholder="Any pets, allergies, special requirements, etc.?"
          />
        </div>

        <div className="flex justify-end items-center gap-6">
          {!(startDate && endDate) ? (
            <>
              <p className="text-primary-300 text-base">
                Start by selecting dates
              </p>
            </>
          ) : (
            <SubmitButton
              buttonText="Reserve now"
              pendingLabel="Reserving..."
            />
          )}
        </div>
      </form>
    </div>
  );
}

export default ReservationForm;
