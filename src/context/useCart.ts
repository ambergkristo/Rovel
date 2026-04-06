import { useContext } from 'react'
import { CartContext } from './CartContext'

export const useCart = () => {
  const value = useContext(CartContext)

  if (!value) {
    throw new Error('useCart must be used within CartProvider')
  }

  return value
}
