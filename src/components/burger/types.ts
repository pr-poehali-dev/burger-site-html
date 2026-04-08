export const HERO_IMG = "https://cdn.poehali.dev/projects/3b1b0135-6d23-4fb0-96d2-f82255c017c8/files/02205a94-795b-4acf-a785-793d8a16cbba.jpg";
export const INTERIOR_IMG = "https://cdn.poehali.dev/projects/3b1b0135-6d23-4fb0-96d2-f82255c017c8/files/045cf281-e0c9-4ed9-96d5-c9f82889a4aa.jpg";

export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  emoji: string;
  category: string;
  badge?: string;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export const MENU: MenuItem[] = [
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

export const CATEGORIES = ["Все", "Бургеры", "Гарниры", "Напитки", "Соусы"];

export const GALLERY_IMGS = [
  { src: HERO_IMG, label: "Наши бургеры" },
  { src: INTERIOR_IMG, label: "Наш зал" },
  { src: HERO_IMG, label: "Смэш-бургер" },
  { src: INTERIOR_IMG, label: "Атмосфера" },
];
