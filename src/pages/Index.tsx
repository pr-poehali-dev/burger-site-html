import { useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/3b1b0135-6d23-4fb0-96d2-f82255c017c8/files/02205a94-795b-4acf-a785-793d8a16cbba.jpg";
const INTERIOR_IMG = "https://cdn.poehali.dev/projects/3b1b0135-6d23-4fb0-96d2-f82255c017c8/files/045cf281-e0c9-4ed9-96d5-c9f82889a4aa.jpg";

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  emoji: string;
  category: string;
  badge?: string;
}

interface CartItem extends MenuItem {
  quantity: number;
}

const MENU: MenuItem[] = [
  { id: 1, name: "Классик Смэш", description: "Двойная говядина смэш, чеддер, маринованный огурец, фирменный соус", price: 490, emoji: "🍔", category: "Бургеры", badge: "ХИТ" },
  { id: 2, name: "Огненный Чили", description: "Говядина, перец халапеньо, острый соус, хрустящий лук", price: 520, emoji: "🌶️", category: "Бургеры" },
  { id: 3, name: "Трюфельный", description: "Говядина, трюфельный майонез, грибы, руккола, пармезан", price: 690, emoji: "✨", category: "Бургеры", badge: "НОВИНКА" },
  { id: 4, name: "Чикен Криспи", description: "Хрустящая курица, коул-слоу, соус ранч, маринованные огурцы", price: 440, emoji: "🍗", category: "Бургеры" },
  { id: 5, name: "Веган Патти", description: "Растительная котлета, авокадо, томаты, свежая зелень, хумус", price: 480, emoji: "🥑", category: "Бургеры" },
  { id: 6, name: "Картофель фри", description: "Хрустящий фри, посыпан морской солью", price: 190, emoji: "🍟", category: "Гарниры" },
  { id: 7, name: "Картофель Вэджес", description: "Дольки с чесноком и розмарином, соус айоли", price: 220, emoji: "🥔", category: "Гарниры" },
  { id: 8, name: "Луковые кольца", description: "Хрустящие кольца, острый дип", price: 210, emoji: "🧅", category: "Гарниры" },
  { id: 9, name: "Шейк Ваниль", description: "Густой молочный шейк, ванильное мороженое, взбитые сливки", price: 280, emoji: "🥛", category: "Напитки" },
  { id: 10, name: "Лимонад Свежий", description: "Свежевыжатые лимоны, мята, газированная вода", price: 240, emoji: "🍋", category: "Напитки" },
  { id: 11, name: "Кола фирменная", description: "Кока-кола со льдом и долькой лайма", price: 180, emoji: "🥤", category: "Напитки" },
  { id: 12, name: "Соус Фирменный", description: "Секретный соус BurgerHouse — острый, сладкий, дымный", price: 90, emoji: "🫙", category: "Соусы" },
];

const CATEGORIES = ["Все", "Бургеры", "Гарниры", "Напитки", "Соусы"];

const GALLERY_IMGS = [
  { src: HERO_IMG, label: "Наши бургеры" },
  { src: INTERIOR_IMG, label: "Наш зал" },
  { src: HERO_IMG, label: "Смэш-бургер" },
  { src: INTERIOR_IMG, label: "Атмосфера" },
];

export default function Index() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("Все");
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

  const filtered = activeCategory === "Все" ? MENU : MENU.filter((m) => m.category === activeCategory);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setActiveSection(id);
  };

  return (
    <div className="min-h-screen font-body" style={{ backgroundColor: "var(--burger-dark)", color: "var(--burger-cream)" }}>

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4"
        style={{ background: "rgba(13,10,7,0.92)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(232,51,10,0.15)" }}>
        <div className="flex items-center gap-2">
          <span className="text-2xl">🍔</span>
          <span className="font-display text-2xl font-bold tracking-wider" style={{ color: "var(--burger-yellow)" }}>
            BURGER<span style={{ color: "var(--burger-red)" }}>HOUSE</span>
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {[
            { id: "home", label: "Главная" },
            { id: "menu", label: "Меню" },
            { id: "about", label: "О нас" },
            { id: "gallery", label: "Галерея" },
            { id: "delivery", label: "Доставка" },
            { id: "contacts", label: "Контакты" },
          ].map((item) => (
            <button key={item.id} onClick={() => scrollTo(item.id)}
              className="nav-link font-display text-sm font-medium tracking-widest uppercase transition-colors"
              style={{ color: activeSection === item.id ? "var(--burger-yellow)" : "var(--burger-cream)" }}>
              {item.label}
            </button>
          ))}
        </div>

        <button onClick={() => setCartOpen(true)}
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

      {/* HERO */}
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
              <button onClick={() => scrollTo("menu")}
                className="flex items-center gap-2 px-8 py-4 rounded-full font-display font-bold text-lg tracking-wider btn-glow transition-all"
                style={{ backgroundColor: "var(--burger-red)", color: "#fff" }}>
                <Icon name="UtensilsCrossed" size={20} />
                Смотреть меню
              </button>
              <button onClick={() => scrollTo("delivery")}
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
                        <button onClick={() => changeQty(item.id, -1)}
                          className="w-8 h-8 rounded-full flex items-center justify-center font-bold transition-all hover:scale-110"
                          style={{ backgroundColor: "rgba(232,51,10,0.2)", color: "var(--burger-red)" }}>
                          <Icon name="Minus" size={14} />
                        </button>
                        <span className="font-display font-bold text-lg w-6 text-center" style={{ color: "var(--burger-cream)" }}>
                          {inCart.quantity}
                        </span>
                        <button onClick={() => changeQty(item.id, 1)}
                          className="w-8 h-8 rounded-full flex items-center justify-center font-bold transition-all hover:scale-110"
                          style={{ backgroundColor: "var(--burger-red)", color: "#fff" }}>
                          <Icon name="Plus" size={14} />
                        </button>
                      </div>
                    ) : (
                      <button onClick={() => addToCart(item)}
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

      {/* CART DRAWER */}
      {cartOpen && (
        <div className="fixed inset-0 z-[100]" onClick={() => setCartOpen(false)}>
          <div className="absolute inset-0" style={{ backgroundColor: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }} />
          <div className="absolute top-0 right-0 bottom-0 w-full max-w-md flex flex-col animate-slide-up"
            style={{ backgroundColor: "#15100a", borderLeft: "1px solid rgba(232,51,10,0.2)" }}
            onClick={(e) => e.stopPropagation()}>

            <div className="flex items-center justify-between p-6" style={{ borderBottom: "1px solid rgba(255,248,240,0.08)" }}>
              <div className="flex items-center gap-3">
                <Icon name="ShoppingCart" size={22} style={{ color: "var(--burger-yellow)" }} />
                <h2 className="font-display text-2xl font-bold" style={{ color: "var(--burger-cream)" }}>КОРЗИНА</h2>
                {totalItems > 0 && (
                  <span className="px-2 py-0.5 rounded-full text-xs font-bold"
                    style={{ backgroundColor: "var(--burger-red)", color: "#fff" }}>{totalItems}</span>
                )}
              </div>
              <button onClick={() => setCartOpen(false)}
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
                style={{ backgroundColor: "rgba(255,248,240,0.05)" }}>
                <Icon name="X" size={18} style={{ color: "rgba(255,248,240,0.6)" }} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-hide">
              {cart.length === 0 ? (
                <div className="text-center py-20">
                  <div className="text-6xl mb-4">🛒</div>
                  <p className="font-display text-xl font-bold mb-2" style={{ color: "var(--burger-cream)" }}>Корзина пуста</p>
                  <p className="text-sm" style={{ color: "rgba(255,248,240,0.4)" }}>Добавьте сочный бургер!</p>
                  <button onClick={() => { setCartOpen(false); scrollTo("menu"); }}
                    className="mt-6 px-6 py-3 rounded-full font-display font-bold text-sm btn-glow transition-all"
                    style={{ backgroundColor: "var(--burger-red)", color: "#fff" }}>
                    Перейти в меню
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="flex gap-4 p-4 rounded-xl animate-fade-in"
                    style={{ backgroundColor: "rgba(255,248,240,0.04)", border: "1px solid rgba(255,248,240,0.07)" }}>
                    <span className="text-3xl mt-1">{item.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-display font-bold text-sm" style={{ color: "var(--burger-cream)" }}>{item.name}</h4>
                        <button onClick={() => removeItem(item.id)}
                          className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all hover:scale-110"
                          style={{ backgroundColor: "rgba(232,51,10,0.15)", color: "var(--burger-red)" }}>
                          <Icon name="Trash2" size={12} />
                        </button>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-2">
                          <button onClick={() => changeQty(item.id, -1)}
                            className="w-7 h-7 rounded-full flex items-center justify-center transition-all hover:scale-110"
                            style={{ backgroundColor: "rgba(255,248,240,0.08)", color: "rgba(255,248,240,0.7)" }}>
                            <Icon name="Minus" size={12} />
                          </button>
                          <span className="font-display font-bold w-6 text-center" style={{ color: "var(--burger-cream)" }}>{item.quantity}</span>
                          <button onClick={() => changeQty(item.id, 1)}
                            className="w-7 h-7 rounded-full flex items-center justify-center transition-all hover:scale-110"
                            style={{ backgroundColor: "var(--burger-red)", color: "#fff" }}>
                            <Icon name="Plus" size={12} />
                          </button>
                        </div>
                        <span className="font-display font-bold" style={{ color: "var(--burger-yellow)" }}>
                          {item.price * item.quantity} ₽
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-6" style={{ borderTop: "1px solid rgba(255,248,240,0.08)" }}>
                <div className="flex items-center justify-between mb-2">
                  <span style={{ color: "rgba(255,248,240,0.5)" }}>Позиций:</span>
                  <span className="font-medium" style={{ color: "var(--burger-cream)" }}>{totalItems} шт.</span>
                </div>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-display text-lg font-bold" style={{ color: "var(--burger-cream)" }}>Итого:</span>
                  <span className="font-display text-2xl font-bold" style={{ color: "var(--burger-yellow)" }}>{totalPrice} ₽</span>
                </div>
                <button className="w-full py-4 rounded-full font-display font-bold text-lg tracking-wide btn-glow transition-all"
                  style={{ backgroundColor: "var(--burger-red)", color: "#fff" }}>
                  Оформить заказ
                </button>
                <button onClick={() => setCartOpen(false)}
                  className="w-full mt-3 py-3 rounded-full font-display font-medium text-sm transition-all"
                  style={{ color: "rgba(255,248,240,0.4)" }}>
                  Продолжить покупки
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}