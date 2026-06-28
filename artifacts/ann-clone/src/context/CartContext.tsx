import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingCart, Trash2, Plus, Minus, CheckCircle2 } from "lucide-react";

export interface CartItem {
  id: string;
  name: string;
  price: string;
  priceNum: number;
  color: string;
  qty: number;
}

interface CartContextType {
  items: CartItem[];
  count: number;
  total: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (item: Omit<CartItem, "qty">) => void;
  removeItem: (id: string) => void;
  changeQty: (id: string, delta: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | null>(null);

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}

function CartDrawer({ items, isOpen, onClose, total, onRemove, onChangeQty, onClear }: {
  items: CartItem[];
  isOpen: boolean;
  onClose: () => void;
  total: number;
  onRemove: (id: string) => void;
  onChangeQty: (id: string, delta: number) => void;
  onClear: () => void;
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90]"
          />
          <motion.div
            key="drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 h-full w-full max-w-sm bg-[#07091a] border-l border-white/10 z-[100] flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/8">
              <div className="flex items-center gap-3">
                <ShoppingCart className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-bold text-white">Your Cart</h2>
                {items.length > 0 && (
                  <span className="text-xs font-bold bg-primary/20 text-primary px-2 py-0.5 rounded-full">
                    {items.reduce((a, i) => a + i.qty, 0)}
                  </span>
                )}
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 text-white/60 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-16">
                  <ShoppingCart className="w-12 h-12 text-white/15 mb-4" />
                  <p className="text-white/40 font-medium">Your cart is empty</p>
                  <p className="text-white/25 text-sm mt-1">Add items from the Shop</p>
                  <button
                    onClick={onClose}
                    className="mt-6 px-5 py-2.5 bg-primary/20 hover:bg-primary/30 text-primary font-semibold rounded-full text-sm transition-colors"
                  >
                    Browse Shop
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: 30 }}
                    className="flex items-center gap-4 p-4 rounded-xl bg-white/4 border border-white/6"
                  >
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                      style={{ backgroundColor: `${item.color}20`, border: `1px solid ${item.color}30` }}
                    >
                      <ShoppingCart className="w-4 h-4" style={{ color: item.color }} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-white truncate">{item.name}</p>
                      <p className="text-xs font-bold mt-0.5" style={{ color: item.color }}>{item.price}</p>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => onChangeQty(item.id, -1)}
                        className="w-6 h-6 flex items-center justify-center rounded-full bg-white/8 hover:bg-white/15 text-white/70 hover:text-white transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-sm font-bold text-white w-5 text-center">{item.qty}</span>
                      <button
                        onClick={() => onChangeQty(item.id, 1)}
                        className="w-6 h-6 flex items-center justify-center rounded-full bg-white/8 hover:bg-white/15 text-white/70 hover:text-white transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => onRemove(item.id)}
                        className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-red-500/20 text-white/30 hover:text-red-400 transition-colors ml-1"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="px-6 py-5 border-t border-white/8 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/50">Subtotal</span>
                  <span className="font-extrabold text-white text-lg">${total.toFixed(2)}</span>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full py-4 bg-primary hover:bg-primary/85 text-white font-bold rounded-xl transition-all hover:shadow-[0_0_30px_rgba(102,0,255,0.4)] flex items-center justify-center gap-2"
                  onClick={() => {
                    onClear();
                    onClose();
                  }}
                >
                  <CheckCircle2 className="w-5 h-5" />
                  Checkout — ${total.toFixed(2)}
                </motion.button>

                <button
                  onClick={onClear}
                  className="w-full text-xs text-white/30 hover:text-red-400 transition-colors py-1"
                >
                  Clear cart
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const count = items.reduce((a, i) => a + i.qty, 0);
  const total = items.reduce((a, i) => a + i.priceNum * i.qty, 0);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const addItem = useCallback((item: Omit<CartItem, "qty">) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) => i.id === item.id ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { ...item, qty: 1 }];
    });
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const changeQty = useCallback((id: string, delta: number) => {
    setItems((prev) =>
      prev.flatMap((i) => {
        if (i.id !== id) return [i];
        const newQty = i.qty + delta;
        return newQty <= 0 ? [] : [{ ...i, qty: newQty }];
      })
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  return (
    <CartContext.Provider value={{ items, count, total, isOpen, openCart, closeCart, addItem, removeItem, changeQty, clearCart }}>
      {children}
      <CartDrawer
        items={items}
        isOpen={isOpen}
        onClose={closeCart}
        total={total}
        onRemove={removeItem}
        onChangeQty={changeQty}
        onClear={clearCart}
      />
    </CartContext.Provider>
  );
}
