import { useState } from "react";
import { CartItem, MenuItem } from "@/components/burger/types";
import Navbar from "@/components/burger/Navbar";
import HeroSection from "@/components/burger/HeroSection";
import MenuSection from "@/components/burger/MenuSection";
import CartDrawer from "@/components/burger/CartDrawer";

export default function Index() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const addToCart = (item: MenuItem) => {
    setCart((prev) => {
      const exists = prev.find((c) => c.id === item.id);
      if (exists) return prev.map((c) => c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c);
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const changeQty = (id: number, delta: number) => {
    setCart((prev) =>
      prev.map((c) => c.id === id ? { ...c, quantity: Math.max(0, c.quantity + delta) } : c)
        .filter((c) => c.quantity > 0)
    );
  };

  const removeItem = (id: number) => setCart((prev) => prev.filter((c) => c.id !== id));

  const totalItems = cart.reduce((s, c) => s + c.quantity, 0);
  const totalPrice = cart.reduce((s, c) => s + c.price * c.quantity, 0);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setActiveSection(id);
  };

  return (
    <div className="min-h-screen font-body" style={{ backgroundColor: "var(--burger-dark)", color: "var(--burger-cream)" }}>
      <Navbar
        activeSection={activeSection}
        totalItems={totalItems}
        onScrollTo={scrollTo}
        onCartOpen={() => setCartOpen(true)}
      />

      <HeroSection onScrollTo={scrollTo} />

      <MenuSection
        cart={cart}
        onAddToCart={addToCart}
        onChangeQty={changeQty}
      />

      {cartOpen && (
        <CartDrawer
          cart={cart}
          totalItems={totalItems}
          totalPrice={totalPrice}
          onClose={() => setCartOpen(false)}
          onChangeQty={changeQty}
          onRemoveItem={removeItem}
          onGoToMenu={() => { setCartOpen(false); scrollTo("menu"); }}
        />
      )}
    </div>
  );
}
