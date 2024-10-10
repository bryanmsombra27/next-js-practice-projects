import type { Metadata } from "next";
import { Josefin_Sans } from "next/font/google";

const josefin = Josefin_Sans({
  display: "swap",
  subsets: ["latin"],
});

import "@/app/_styles/globals.css";
import Header from "@/app/_components/Header";
import { ReservationContextProvider } from "./ReservationContext";

export const metadata: Metadata = {
  // title: "The Wild Oasis",
  title: {
    template: "%s - The Wild Oasis",
    default: "Welcome - The Wild Oasis",
  },
  description:
    "Luxurious cabin hotel, located in the heart of the Italian Dolomites, surrounded by beautiful mountains and dark forests",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${josefin.className}  bg-primary-950 text-primary-100 min-h-screen flex flex-col antialiased relative`}
      >
        <Header />
        <div className="flex-1 px-8 py-12 grid">
          <main className="max-w-7xl  mx-auto w-full">
            <ReservationContextProvider>{children}</ReservationContextProvider>
          </main>
        </div>
      </body>
    </html>
  );
}
