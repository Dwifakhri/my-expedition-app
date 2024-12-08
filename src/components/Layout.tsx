"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Alert from "@/components/Alert";
import { useStatus } from "@/contexts/status";

export default function Layout({ children }: any) {
  const { status } = useStatus();
  return (
    <div className="relative">
      <Alert status={status} />
      <Navbar />
      <div className="container mx-auto main-site">{children}</div>
      <Footer />
    </div>
  );
}
