import { Nunito } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext"],
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
