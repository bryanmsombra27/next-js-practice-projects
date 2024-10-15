"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import supabase from "./supabase";
import { getBookings } from "./data-service";
import { redirect } from "next/navigation";

export async function signInAction() {
  await signIn("google", {
    redirectTo: "/account",
  });
}

export async function signOutAction() {
  await signOut({
    redirectTo: "/",
  });
}

export async function updateGuest(formData: FormData) {
  const session = (await auth()) as any;

  if (!session) throw new Error("You must be logged in");

  const nationalID = String(formData.get("nationalID"));
  const [nationality, countryFlag] = String(formData.get("nationality")).split(
    "%"
  );

  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID))
    throw new Error("Please provide a valid nationalID");

  const updateData = {
    nationality,
    countryFlag,
    nationalID,
  };

  const { data, error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", session.user?.guestId)
    .select()
    .single();

  if (error) {
    throw new Error("Guest could not be updated");
  }

  revalidatePath("/account/profile");
}

export const deleteReservation = async (bookingId: number) => {
  const session = (await auth()) as any;
  if (!session) throw new Error("You must be logged in");

  const guestBookings = await getBookings(session?.user?.guestId);

  const guestBookingsIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingsIds.includes(bookingId))
    throw new Error("You are not allowed to delete this booking ");

  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) throw new Error("Booking could not be deleted");

  revalidatePath("/account/reservations");
};

export const updateBooking = async (formData: FormData) => {
  const session = (await auth()) as any;
  if (!session) throw new Error("You must be logged in");

  const bookingId = Number(formData.get("bookingId"));
  const guestBookings = await getBookings(session?.user?.guestId);

  const guestBookingsIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingsIds.includes(bookingId))
    throw new Error("You are not allowed to update this booking ");

  const updateData = {
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations")?.slice(0, 1000),
  };

  const { error } = await supabase
    .from("bookings")
    .update(updateData)
    .eq("id", bookingId)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
  revalidatePath(`/account/reservations/edit/${bookingId}`);
  revalidatePath("/account/reservations");

  redirect("/account/reservations");
};

export const updateReservation = async (bookingId: number) => {};
