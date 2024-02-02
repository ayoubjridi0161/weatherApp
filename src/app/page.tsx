import Image from "next/image";
import Navbar from "@/components/Navbar";
export default function Home() {
  return (
    <div className="flex-col gap-4 flex bg-gray-100 min-h-screen">
      <Navbar />
    </div>
    );
}
