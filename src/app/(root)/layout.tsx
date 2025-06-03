import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import { Header } from "@/components";

export const metadata: Metadata = {
  title: "Next Pizza",
  description: "вкусней уже некуда",
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main>{children}</main>
      {modal}
      <Toaster />
    </>
  );
}
