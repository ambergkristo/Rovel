import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { LocaleProvider } from './context/LocaleContext'
import { StorefrontLayout } from './components/StorefrontLayout'
import { CartPage } from './pages/CartPage'
import { CustomOrderPage } from './pages/CustomOrderPage'
import { HomePage } from './pages/HomePage'
import { NotFoundPage } from './pages/NotFoundPage'
import { ProductDetailPage } from './pages/ProductDetailPage'
import { ProductListingPage } from './pages/ProductListingPage'
import { ProductsPage } from './pages/ProductsPage'

function App() {
  return (
    <LocaleProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<StorefrontLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/products/:categoryId" element={<ProductListingPage />} />
              <Route path="/product/:slug" element={<ProductDetailPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/custom-order" element={<CustomOrderPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </LocaleProvider>
  )
}

export default App
