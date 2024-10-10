export interface Setting {
  id: number;
  minBookingLength: number;
  maxBookingLength: number;
  maxGuestPerBooking: number;
  breakfastPrice: number;
  created_at?: string;
}
