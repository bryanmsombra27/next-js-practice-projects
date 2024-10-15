import { Cabin } from "./Cabin.interface";

export interface Booking {
  id: number;
  guestId: string;
  startDate: string;
  endDate: string;
  numNights: number;
  totalPrice: number;
  numGuests: number;
  status: string;
  created_at: string;
  observations?: string;
  cabins: {
    name: string;
    image: string;
  };
  cabinId: number;
}
export interface BookedDates {
  start: string;
  end: string;
}

export interface BookingDraft {
  guestId?: string;
  startDate: Date;
  endDate: Date;
  numNights: number;
  cabinId: number;
  totalPrice: number;
}
