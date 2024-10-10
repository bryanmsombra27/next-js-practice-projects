import { Cabin } from "./Cabin.interface";

export interface Booking {
  id: string;
  guestId: string;
  startDate: string;
  endDate: string;
  numNights: number;
  totalPrice: number;
  numGuests: number;
  status: string;
  created_at: string;
  cabins: {
    name: string;
    image: string;
  };
}
export interface BookedDates {
  start: string;
  end: string;
}
