"use client"

import { CartProvider } from "@/lib/cart/store"
import CartDrawer from "@/lib/components/cart-drawer"

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      {children}
      <CartDrawer />
    </CartProvider>
  )
}
