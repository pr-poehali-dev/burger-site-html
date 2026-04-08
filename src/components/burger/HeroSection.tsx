import Icon from "@/components/ui/icon";
import { HERO_IMG } from "./types";

interface HeroSectionProps {
  onScrollTo: (id: string) => void;
}

export default function HeroSection({ onScrollTo }: HeroSectionProps) {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={HERO_IMG} alt="Бургер" className="w-full h-full object-cover" style={{ opacity: 0.35 }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(13,10,7,0.95) 0%, rgba(13,10,7,0.6) 60%, rgba(232,51,10,0.1) 100%)" }} />
      </div>

      <div className="relative z-10 container mx-auto px-6 pt-24 pb-16">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6 animate-fade-in"
            style={{ backgroundColor: "rgba(232,51,10,0.2)", border: "1px solid rgba(232,51,10,0.4)", color: "var(--burger-yellow)" }}>
            <span>🔥</span> Горячие бургеры каждый день
          </div>

          <h1 className="font-display text-6xl md:text-8xl font-bold leading-none mb-6 animate-slide-up"
            style={{ animationDelay: "0.1s" }}>
            <span className="text-gradient">СОЧНЫЕ</span>
            <br />
            <span style={{ color: "var(--burger-cream)" }}>БУРГЕРЫ</span>
            <br />
            <span style={{ color: "var(--burger-yellow)" }}>С ДУШОЙ</span>
          </h1>

          <p className="text-lg mb-10 max-w-xl animate-slide-up" style={{ color: "rgba(255,248,240,0.7)", animationDelay: "0.2s" }}>
            Готовим из свежих продуктов, мясо только отечественных ферм. Каждый бургер — маленький шедевр.
          </p>

          <div className="flex flex-wrap gap-4 animate-slide-up" style={{ animationDelay: "0.3s" }}>
            <button onClick={() => onScrollTo("menu")}
              className="flex items-center gap-2 px-8 py-4 rounded-full font-display font-bold text-lg tracking-wider btn-glow transition-all"
              style={{ backgroundColor: "var(--burger-red)", color: "#fff" }}>
              <Icon name="UtensilsCrossed" size={20} />
              Смотреть меню
            </button>
            <button onClick={() => onScrollTo("delivery")}
              className="flex items-center gap-2 px-8 py-4 rounded-full font-display font-bold text-lg tracking-wider transition-all yellow-glow"
              style={{ backgroundColor: "transparent", color: "var(--burger-yellow)", border: "2px solid var(--burger-yellow)" }}>
              <Icon name="Truck" size={20} />
              Доставка
            </button>
          </div>

          <div className="flex gap-12 mt-14 animate-slide-up" style={{ animationDelay: "0.4s" }}>
            {[
              { num: "15+", label: "Видов бургеров" },
              { num: "30 мин", label: "Время доставки" },
              { num: "4.9★", label: "Рейтинг" },
            ].map((stat) => (
              <div key={stat.num}>
                <div className="font-display text-3xl font-bold" style={{ color: "var(--burger-yellow)" }}>{stat.num}</div>
                <div className="text-sm mt-1" style={{ color: "rgba(255,248,240,0.5)" }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(232,51,10,0.15) 0%, transparent 70%)" }} />
    </section>
  );
}
