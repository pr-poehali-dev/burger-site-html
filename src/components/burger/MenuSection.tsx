import { useState } from "react";
import Icon from "@/components/ui/icon";
import { MenuItem, CartItem, MENU, CATEGORIES, GALLERY_IMGS, INTERIOR_IMG } from "./types";

interface MenuSectionProps {
  cart: CartItem[];
  onAddToCart: (item: MenuItem) => void;
  onChangeQty: (id: number, delta: number) => void;
}

export default function MenuSection({ cart, onAddToCart, onChangeQty }: MenuSectionProps) {
  const [activeCategory, setActiveCategory] = useState("Все");

  const filtered = activeCategory === "Все" ? MENU : MENU.filter((m) => m.category === activeCategory);

  return (
    <>
      {/* MENU */}
      <section id="menu" className="py-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <p className="font-display text-sm tracking-[0.3em] mb-3" style={{ color: "var(--burger-red)" }}>ЧТО ПРИГОТОВИТЬ</p>
            <h2 className="font-display text-5xl md:text-6xl font-bold" style={{ color: "var(--burger-cream)" }}>
              НАШЕ <span className="text-gradient">МЕНЮ</span>
            </h2>
            <div className="section-divider mt-6 max-w-xs mx-auto" />
          </div>

          <div className="flex gap-3 mb-12 flex-wrap justify-center">
            {CATEGORIES.map((cat) => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                className="px-6 py-2 rounded-full font-display font-medium text-sm tracking-wider transition-all"
                style={activeCategory === cat
                  ? { backgroundColor: "var(--burger-red)", color: "#fff", boxShadow: "0 4px 15px rgba(232,51,10,0.4)" }
                  : { backgroundColor: "rgba(255,248,240,0.05)", color: "rgba(255,248,240,0.6)", border: "1px solid rgba(255,248,240,0.1)" }
                }>
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((item) => {
              const inCart = cart.find((c) => c.id === item.id);
              return (
                <div key={item.id} className="card-glow relative rounded-2xl p-6 transition-all cursor-pointer"
                  style={{ backgroundColor: "rgba(255,248,240,0.04)", border: "1px solid rgba(255,248,240,0.08)" }}>
                  {item.badge && (
                    <span className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-display font-bold tracking-wider"
                      style={{ backgroundColor: item.badge === "ХИТ" ? "var(--burger-red)" : "var(--burger-yellow)", color: item.badge === "ХИТ" ? "#fff" : "var(--burger-dark)" }}>
                      {item.badge}
                    </span>
                  )}
                  <div className="text-5xl mb-4 float">{item.emoji}</div>
                  <h3 className="font-display text-xl font-bold mb-2" style={{ color: "var(--burger-cream)" }}>{item.name}</h3>
                  <p className="text-sm mb-5" style={{ color: "rgba(255,248,240,0.5)" }}>{item.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-display text-2xl font-bold" style={{ color: "var(--burger-yellow)" }}>{item.price} ₽</span>
                    {inCart ? (
                      <div className="flex items-center gap-3">
                        <button onClick={() => onChangeQty(item.id, -1)}
                          className="w-8 h-8 rounded-full flex items-center justify-center font-bold transition-all hover:scale-110"
                          style={{ backgroundColor: "rgba(232,51,10,0.2)", color: "var(--burger-red)" }}>
                          <Icon name="Minus" size={14} />
                        </button>
                        <span className="font-display font-bold text-lg w-6 text-center" style={{ color: "var(--burger-cream)" }}>
                          {inCart.quantity}
                        </span>
                        <button onClick={() => onChangeQty(item.id, 1)}
                          className="w-8 h-8 rounded-full flex items-center justify-center font-bold transition-all hover:scale-110"
                          style={{ backgroundColor: "var(--burger-red)", color: "#fff" }}>
                          <Icon name="Plus" size={14} />
                        </button>
                      </div>
                    ) : (
                      <button onClick={() => onAddToCart(item)}
                        className="flex items-center gap-2 px-4 py-2 rounded-full font-display text-sm font-bold tracking-wide transition-all btn-glow"
                        style={{ backgroundColor: "var(--burger-red)", color: "#fff" }}>
                        <Icon name="Plus" size={14} />
                        В корзину
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 px-6" style={{ backgroundColor: "rgba(255,248,240,0.02)" }}>
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="font-display text-sm tracking-[0.3em] mb-3" style={{ color: "var(--burger-red)" }}>НАША ИСТОРИЯ</p>
              <h2 className="font-display text-5xl font-bold mb-6" style={{ color: "var(--burger-cream)" }}>
                О <span className="text-gradient">НАС</span>
              </h2>
              <p className="text-lg mb-6 leading-relaxed" style={{ color: "rgba(255,248,240,0.65)" }}>
                BurgerHouse родился в 2019 году из простой идеи: делать честные, сочные бургеры без компромиссов. Никакой заморозки, никаких полуфабрикатов — только свежие продукты и любовь к делу.
              </p>
              <p className="text-lg mb-10 leading-relaxed" style={{ color: "rgba(255,248,240,0.65)" }}>
                Наши котлеты делаются вручную каждое утро. Булочки бриошь выпекаются у партнёрской пекарни. Соусы — собственная разработка шеф-повара.
              </p>
              <div className="grid grid-cols-3 gap-6">
                {[
                  { icon: "Flame", label: "Свежее мясо", desc: "Ежедневная поставка" },
                  { icon: "Leaf", label: "Натурально", desc: "Без ГМО и добавок" },
                  { icon: "Heart", label: "С любовью", desc: "Ручная работа" },
                ].map((feat) => (
                  <div key={feat.label} className="text-center p-4 rounded-xl" style={{ backgroundColor: "rgba(232,51,10,0.1)", border: "1px solid rgba(232,51,10,0.2)" }}>
                    <div className="flex justify-center mb-2">
                      <Icon name={feat.icon} size={28} style={{ color: "var(--burger-yellow)" }} />
                    </div>
                    <div className="font-display font-bold text-sm" style={{ color: "var(--burger-cream)" }}>{feat.label}</div>
                    <div className="text-xs mt-1" style={{ color: "rgba(255,248,240,0.4)" }}>{feat.desc}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img src={INTERIOR_IMG} alt="Интерьер ресторана" className="rounded-2xl w-full object-cover h-96" style={{ border: "2px solid rgba(232,51,10,0.2)" }} />
              <div className="absolute -bottom-6 -left-6 p-5 rounded-2xl"
                style={{ backgroundColor: "var(--burger-red)", boxShadow: "0 8px 30px rgba(232,51,10,0.5)" }}>
                <div className="font-display text-3xl font-bold text-white">5+</div>
                <div className="text-sm text-white opacity-80">лет на рынке</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="py-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <p className="font-display text-sm tracking-[0.3em] mb-3" style={{ color: "var(--burger-red)" }}>НАШИ ФОТО</p>
            <h2 className="font-display text-5xl font-bold" style={{ color: "var(--burger-cream)" }}>
              ГА<span className="text-gradient">ЛЕРЕЯ</span>
            </h2>
            <div className="section-divider mt-6 max-w-xs mx-auto" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {GALLERY_IMGS.map((img, i) => (
              <div key={i} className="relative overflow-hidden rounded-2xl group cursor-pointer" style={{ aspectRatio: "1" }}>
                <img src={img.src} alt={img.label} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: "linear-gradient(transparent, rgba(13,10,7,0.85))" }}>
                  <span className="font-display font-bold text-sm" style={{ color: "var(--burger-yellow)" }}>{img.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DELIVERY */}
      <section id="delivery" className="py-24 px-6" style={{ backgroundColor: "rgba(255,248,240,0.02)" }}>
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <p className="font-display text-sm tracking-[0.3em] mb-3" style={{ color: "var(--burger-red)" }}>БЫСТРО И ГОРЯЧО</p>
            <h2 className="font-display text-5xl font-bold" style={{ color: "var(--burger-cream)" }}>
              ДО<span className="text-gradient">СТАВКА</span>
            </h2>
            <div className="section-divider mt-6 max-w-xs mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              { icon: "ClipboardList", step: "01", title: "Выбери бургер", desc: "Листай меню и добавляй любимые позиции в корзину" },
              { icon: "CreditCard", step: "02", title: "Оформи заказ", desc: "Укажи адрес доставки и выбери способ оплаты" },
              { icon: "Zap", step: "03", title: "Жди 30 минут", desc: "Горячий бургер уже едет к тебе — отслеживай заказ онлайн" },
            ].map((step) => (
              <div key={step.step} className="relative p-8 rounded-2xl text-center card-glow"
                style={{ backgroundColor: "rgba(255,248,240,0.04)", border: "1px solid rgba(255,248,240,0.08)" }}>
                <div className="font-display text-6xl font-bold mb-4 opacity-10"
                  style={{ color: "var(--burger-red)" }}>{step.step}</div>
                <div className="flex justify-center mb-4">
                  <Icon name={step.icon} size={36} style={{ color: "var(--burger-yellow)" }} />
                </div>
                <h3 className="font-display text-xl font-bold mb-3" style={{ color: "var(--burger-cream)" }}>{step.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,248,240,0.5)" }}>{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-8 rounded-2xl" style={{ backgroundColor: "rgba(232,51,10,0.1)", border: "1px solid rgba(232,51,10,0.25)" }}>
              <h3 className="font-display text-2xl font-bold mb-4" style={{ color: "var(--burger-yellow)" }}>Зоны доставки</h3>
              <div className="space-y-3">
                {[
                  { zone: "Центральный район", price: "Бесплатно от 800 ₽", time: "25–35 мин" },
                  { zone: "Северный район", price: "99 ₽ / бесплатно от 1200 ₽", time: "35–45 мин" },
                  { zone: "Западный район", price: "149 ₽ / бесплатно от 1500 ₽", time: "45–55 мин" },
                ].map((z) => (
                  <div key={z.zone} className="flex items-center justify-between py-3" style={{ borderBottom: "1px solid rgba(255,248,240,0.08)" }}>
                    <div>
                      <div className="font-medium" style={{ color: "var(--burger-cream)" }}>{z.zone}</div>
                      <div className="text-sm" style={{ color: "rgba(255,248,240,0.45)" }}>{z.price}</div>
                    </div>
                    <span className="text-sm font-display font-bold" style={{ color: "var(--burger-yellow)" }}>⏱ {z.time}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-8 rounded-2xl" style={{ backgroundColor: "rgba(255,193,7,0.08)", border: "1px solid rgba(255,193,7,0.2)" }}>
              <h3 className="font-display text-2xl font-bold mb-4" style={{ color: "var(--burger-yellow)" }}>Время работы</h3>
              <div className="space-y-3">
                {[
                  { day: "Понедельник – Пятница", time: "11:00 – 23:00" },
                  { day: "Суббота", time: "10:00 – 00:00" },
                  { day: "Воскресенье", time: "10:00 – 23:00" },
                ].map((t) => (
                  <div key={t.day} className="flex items-center justify-between py-3" style={{ borderBottom: "1px solid rgba(255,248,240,0.08)" }}>
                    <span style={{ color: "rgba(255,248,240,0.65)" }}>{t.day}</span>
                    <span className="font-display font-bold" style={{ color: "var(--burger-cream)" }}>{t.time}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 rounded-xl text-center" style={{ backgroundColor: "rgba(255,193,7,0.15)" }}>
                <span className="text-sm font-medium" style={{ color: "var(--burger-yellow)" }}>🚀 Экспресс-доставка за 20 минут в центре</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <p className="font-display text-sm tracking-[0.3em] mb-3" style={{ color: "var(--burger-red)" }}>СВЯЖИТЕСЬ С НАМИ</p>
            <h2 className="font-display text-5xl font-bold" style={{ color: "var(--burger-cream)" }}>
              КОН<span className="text-gradient">ТАКТЫ</span>
            </h2>
            <div className="section-divider mt-6 max-w-xs mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: "MapPin", title: "Адрес", lines: ["ул. Бургерная, 42", "Москва, Центральный р-н"] },
              { icon: "Phone", title: "Телефон", lines: ["+7 (495) 123-45-67", "+7 (495) 765-43-21"] },
              { icon: "Clock", title: "Режим работы", lines: ["Пн–Пт: 11:00–23:00", "Сб–Вс: 10:00–00:00"] },
            ].map((c) => (
              <div key={c.title} className="p-8 rounded-2xl text-center card-glow"
                style={{ backgroundColor: "rgba(255,248,240,0.04)", border: "1px solid rgba(255,248,240,0.08)" }}>
                <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5"
                  style={{ backgroundColor: "rgba(232,51,10,0.15)", border: "1px solid rgba(232,51,10,0.3)" }}>
                  <Icon name={c.icon} size={24} style={{ color: "var(--burger-red)" }} />
                </div>
                <h3 className="font-display text-xl font-bold mb-3" style={{ color: "var(--burger-yellow)" }}>{c.title}</h3>
                {c.lines.map((l) => (
                  <p key={l} className="text-sm" style={{ color: "rgba(255,248,240,0.6)" }}>{l}</p>
                ))}
              </div>
            ))}
          </div>

          <div className="mt-12 p-8 rounded-2xl text-center" style={{ backgroundColor: "rgba(232,51,10,0.08)", border: "1px solid rgba(232,51,10,0.2)" }}>
            <p className="font-display text-lg font-bold mb-2" style={{ color: "var(--burger-cream)" }}>Остались вопросы?</p>
            <p className="text-sm mb-6" style={{ color: "rgba(255,248,240,0.5)" }}>Напишите нам в мессенджер или оставьте заявку</p>
            <div className="flex gap-4 justify-center flex-wrap">
              <button className="flex items-center gap-2 px-6 py-3 rounded-full font-display font-bold text-sm tracking-wide btn-glow transition-all"
                style={{ backgroundColor: "var(--burger-red)", color: "#fff" }}>
                <Icon name="MessageCircle" size={18} />
                Написать в Telegram
              </button>
              <button className="flex items-center gap-2 px-6 py-3 rounded-full font-display font-bold text-sm tracking-wide transition-all"
                style={{ backgroundColor: "transparent", color: "var(--burger-yellow)", border: "2px solid var(--burger-yellow)" }}>
                <Icon name="Mail" size={18} />
                Отправить письмо
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 px-6" style={{ borderTop: "1px solid rgba(255,248,240,0.06)" }}>
        <div className="container mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">🍔</span>
            <span className="font-display text-lg font-bold" style={{ color: "var(--burger-yellow)" }}>
              BURGER<span style={{ color: "var(--burger-red)" }}>HOUSE</span>
            </span>
          </div>
          <p className="text-sm" style={{ color: "rgba(255,248,240,0.3)" }}>© 2026 BurgerHouse. Все права защищены.</p>
          <div className="flex gap-6">
            {["О нас", "Меню", "Доставка"].map((l) => (
              <span key={l} className="text-sm cursor-pointer hover:underline" style={{ color: "rgba(255,248,240,0.35)" }}>{l}</span>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
}
