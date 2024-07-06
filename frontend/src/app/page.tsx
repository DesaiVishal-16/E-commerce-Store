import dynamic from "next/dynamic";
import ProductsPage from "./product/page";
const Navbar = dynamic(() => import("../components/Navbar"), { ssr: false });

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center  bg-gray-300 w-full">
      <Navbar />
      <ProductsPage />
    </main>
  );
}
