import ReservationCard from "@/app/_components/ReservationCard";
import { Booking } from "@/app/_interfaces/Booking.interface";
import { auth } from "@/app/_lib/auth";
import { getBookings } from "@/app/_lib/data-service";
import { Metadata } from "next";
import Link from "next/link";
import { FC } from "react";

export const metadata: Metadata = {
  title: "Reservations",
};

interface pageProps {}
const page: FC<pageProps> = async ({}) => {
  // CHANGE
  const session = (await auth()) as any;
  const guestId = session?.user!.guestId;
  const bookings: Booking[] = await getBookings(guestId);

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Your reservations
      </h2>

      {bookings.length === 0 ? (
        <p className="text-lg">
          You have no reservations yet. Check out our{" "}
          <Link
            className="underline text-accent-500"
            href="/cabins"
          >
            luxury cabins &rarr;
          </Link>
        </p>
      ) : (
        <ul className="space-y-6">
          {bookings.map((booking) => (
            <ReservationCard
              booking={booking}
              key={booking.id}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default page;
