import Icon from "@/components/ui/icon";

interface NavbarProps {
  activeSection: string;
  totalItems: number;
  onScrollTo: (id: string) => void;
  onCartOpen: () => void;
}

const NAV_LINKS = [
  { id: "home", label: "Главная" },
  { id: "menu", label: "Меню" },
  { id: "about", label: "О нас" },
  { id: "gallery", label: "Галерея" },
  { id: "delivery", label: "Доставка" },
  { id: "contacts", label: "Контакты" },
];

export default function Navbar({ activeSection, totalItems, onScrollTo, onCartOpen }: NavbarProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4"
      style={{ background: "rgba(13,10,7,0.92)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(232,51,10,0.15)" }}>
      <div className="flex items-center gap-2">
        <span className="text-2xl">🍔</span>
        <span className="font-display text-2xl font-bold tracking-wider" style={{ color: "var(--burger-yellow)" }}>
          BURGER<span style={{ color: "var(--burger-red)" }}>HOUSE</span>
        </span>
      </div>

      <div className="hidden md:flex items-center gap-8">
        {NAV_LINKS.map((item) => (
          <button key={item.id} onClick={() => onScrollTo(item.id)}
            className="nav-link font-display text-sm font-medium tracking-widest uppercase transition-colors"
            style={{ color: activeSection === item.id ? "var(--burger-yellow)" : "var(--burger-cream)" }}>
            {item.label}
          </button>
        ))}
      </div>

      <button onClick={onCartOpen}
        className="relative flex items-center gap-2 px-4 py-2 rounded-full font-display font-bold text-sm tracking-wider btn-glow transition-all"
        style={{ backgroundColor: "var(--burger-red)", color: "#fff" }}>
        <Icon name="ShoppingCart" size={18} />
        Корзина
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold animate-bounce-in"
            style={{ backgroundColor: "var(--burger-yellow)", color: "var(--burger-dark)" }}>
            {totalItems}
          </span>
        )}
      </button>
    </nav>
  );
}
