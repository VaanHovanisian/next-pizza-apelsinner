




export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
    <h1>Dashboard header</h1>
       {children}
    </>
       
   
  );
}
