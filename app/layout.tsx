import type { Metadata } from "next";
import { Cherry_Bomb_One } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const cherryBombOne = Cherry_Bomb_One({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lucro Prediction",
  description: "A prediction game on the Binance Smart Chain",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={cherryBombOne.className}>
        <Providers>{children}</Providers>
        <ToastContainer />
      </body>
    </html>
  );
}
