import Icon from "@/components/ui/icon";
import { CartItem } from "./types";

interface CartDrawerProps {
  cart: CartItem[];
  totalItems: number;
  totalPrice: number;
  onClose: () => void;
  onChangeQty: (id: number, delta: number) => void;
  onRemoveItem: (id: number) => void;
  onGoToMenu: () => void;
}

export default function CartDrawer({
  cart,
  totalItems,
  totalPrice,
  onClose,
  onChangeQty,
  onRemoveItem,
  onGoToMenu,
}: CartDrawerProps) {
  return (
    <div className="fixed inset-0 z-[100]" onClick={onClose}>
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
          <button onClick={onClose}
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
              <button onClick={onGoToMenu}
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
                    <button onClick={() => onRemoveItem(item.id)}
                      className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all hover:scale-110"
                      style={{ backgroundColor: "rgba(232,51,10,0.15)", color: "var(--burger-red)" }}>
                      <Icon name="Trash2" size={12} />
                    </button>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-2">
                      <button onClick={() => onChangeQty(item.id, -1)}
                        className="w-7 h-7 rounded-full flex items-center justify-center transition-all hover:scale-110"
                        style={{ backgroundColor: "rgba(255,248,240,0.08)", color: "rgba(255,248,240,0.7)" }}>
                        <Icon name="Minus" size={12} />
                      </button>
                      <span className="font-display font-bold w-6 text-center" style={{ color: "var(--burger-cream)" }}>{item.quantity}</span>
                      <button onClick={() => onChangeQty(item.id, 1)}
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
            <button onClick={onClose}
              className="w-full mt-3 py-3 rounded-full font-display font-medium text-sm transition-all"
              style={{ color: "rgba(255,248,240,0.4)" }}>
              Продолжить покупки
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
