import {
  useCallback,
  createContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from 'react'
import type { CartItem } from '../types'

interface CartContextValue {
  items: CartItem[]
  isCartOpen: boolean
  itemCount: number
  subtotal: number
  addItem: (item: CartItem) => void
  updateQuantity: (itemId: string, quantity: number) => void
  removeItem: (itemId: string) => void
  clearCart: () => void
  openCart: () => void
  closeCart: () => void
}

const cartStorageKey = 'rovel-storefront-cart-v1'

const CartContext = createContext<CartContextValue | null>(null)

const readStoredCart = (): CartItem[] => {
  if (typeof window === 'undefined') {
    return []
  }

  const stored = window.localStorage.getItem(cartStorageKey)

  if (!stored) {
    return []
  }

  try {
    const parsed = JSON.parse(stored) as CartItem[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function CartProvider({ children }: PropsWithChildren) {
  const [items, setItems] = useState<CartItem[]>(readStoredCart)
  const [isCartOpen, setIsCartOpen] = useState(false)

  useEffect(() => {
    window.localStorage.setItem(cartStorageKey, JSON.stringify(items))
  }, [items])

  const addItem = useCallback((item: CartItem) => {
    setItems((currentItems) => {
      const existingItem = currentItems.find((currentItem) => currentItem.id === item.id)

      if (!existingItem) {
        return [...currentItems, item]
      }

      return currentItems.map((currentItem) =>
        currentItem.id === item.id
          ? { ...currentItem, quantity: currentItem.quantity + item.quantity }
          : currentItem,
      )
    })
    setIsCartOpen(true)
  }, [])

  const updateQuantity = useCallback((itemId: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((currentItems) => currentItems.filter((item) => item.id !== itemId))
      return
    }

    setItems((currentItems) =>
      currentItems.map((item) => (item.id === itemId ? { ...item, quantity } : item)),
    )
  }, [])

  const removeItem = useCallback((itemId: string) => {
    setItems((currentItems) => currentItems.filter((item) => item.id !== itemId))
  }, [])

  const clearCart = useCallback(() => setItems([]), [])
  const openCart = useCallback(() => setIsCartOpen(true), [])
  const closeCart = useCallback(() => setIsCartOpen(false), [])

  return (
    <CartContext.Provider
      value={{
        items,
        isCartOpen,
        itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
        subtotal: items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0),
        addItem,
        updateQuantity,
        removeItem,
        clearCart,
        openCart,
        closeCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export { CartContext }
