import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Layout({ children }: any) {
  return (
    <div className="relative">
      <Navbar />
      <div className="container mx-auto main-site">{children}</div>
      <Footer />
    </div>
  );
}
