import { Nunito } from "next/font/google";
import "./globals.css";

export const nunito = Nunito({
  variable: "--font-family",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={nunito.className}>{children}</body>
    </html>
  );
}
