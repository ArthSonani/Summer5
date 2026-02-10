import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useCart } from "@/context/CartContext";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { totalItems } = useCart();

  return (
    <div className="min-h-screen flex flex-col">
      <Header cartCount={totalItems} />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
