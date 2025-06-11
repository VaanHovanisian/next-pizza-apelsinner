import { Container, Header } from "@/components";

export default function CheckoutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-gray-100 h-full">
      <Header hasSearch={false} />
      <Container>{children}</Container>
    </div>
  );
}
