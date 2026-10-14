import React from 'react';
import ReactDOM from 'react-dom/client';
import ParallaxDemo from '@/demos/default';
import { ProductDetailPage } from '@/components/ui/product-detail-page';
import { CartProvider } from '@/components/ui/cart-context';
import { CartPage } from '@/components/ui/cart-page';
import './index.css';

const productMatch = window.location.pathname.match(/^\/product\/([^/]+)\/?$/);
const page = window.location.pathname === '/cart'
  ? <CartPage />
  : productMatch
    ? <ProductDetailPage slug={decodeURIComponent(productMatch[1])} />
    : <ParallaxDemo />;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CartProvider>{page}</CartProvider>
  </React.StrictMode>,
);
