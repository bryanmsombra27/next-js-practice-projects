"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import supabase from "./supabase";

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
