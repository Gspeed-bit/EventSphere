import Footer from "@/components/ui/shared/Footer";
import Header from "@/components/ui/shared/Header";

// this was created because we dont want the header and footer in all the pages so we created this layout seperatly
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col h-screen">
      <Header/>
      <main className="flex-1" >{children}</main>
      <Footer/>
    </div>
  );
}
