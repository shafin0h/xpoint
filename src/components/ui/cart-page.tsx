import { ArrowLeft, Minus, Plus, Trash2 } from 'lucide-react';
import { SiteHeader } from '@/components/ui/site-header';
import { useCart } from '@/components/ui/cart-context';

const amountOf = (price: string) => Number(price.replace(/\D/g, '')) || 0;
const formatPrice = (amount: number) => `৳${amount.toLocaleString('en-BD')}`;

export function CartPage() {
  const { items, removeItem, setItemQuantity } = useCart();
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  const total = items.reduce((sum, item) => sum + amountOf(item.product.price) * item.quantity, 0);

  return (
    <>
      <SiteHeader />
      <main className="cart-page">
        <a className="cart-page__back" href="/#collection"><ArrowLeft aria-hidden="true" /> Continue shopping</a>
        <div className="cart-page__heading">
          <h1>Your bag</h1>
          <span>{itemCount} {itemCount === 1 ? 'item' : 'items'}</span>
        </div>
        {items.length === 0 ? (
          <div className="cart-page__empty">
            <p>Your bag is empty.</p>
            <a href="/#collection">Explore the collection</a>
          </div>
        ) : (
          <div className="cart-page__layout">
            <section className="cart-page__items" aria-label="Items in your bag">
              {items.map(({ product, quantity, size, color }) => (
                <article className="cart-page__item" key={`${product.slug}-${size}-${color}`}>
                  <a href={`/product/${product.slug}`} className="cart-page__image"><img src={product.image} alt={product.alt} /></a>
                  <div className="cart-page__details">
                    <div className="cart-page__item-heading">
                      <div><h2>{product.name}</h2><p>{product.colors[color].name} · Size {size}</p></div>
                      <strong>{formatPrice(amountOf(product.price) * quantity)}</strong>
                    </div>
                    <div className="cart-page__item-bottom">
                      <div className="cart-page__quantity" aria-label={`Quantity: ${quantity}`}>
                        <button type="button" aria-label={`Decrease ${product.name} quantity`} onClick={() => quantity > 1 ? setItemQuantity(product.slug, size, color, quantity - 1) : removeItem(product.slug, size, color)}><Minus aria-hidden="true" /></button>
                        <span>{quantity}</span>
                        <button type="button" aria-label={`Increase ${product.name} quantity`} onClick={() => setItemQuantity(product.slug, size, color, quantity + 1)}><Plus aria-hidden="true" /></button>
                      </div>
                      <button className="cart-page__remove" type="button" onClick={() => removeItem(product.slug, size, color)}><Trash2 aria-hidden="true" /> Remove</button>
                    </div>
                  </div>
                </article>
              ))}
            </section>
            <aside className="cart-page__summary" aria-label="Order summary">
              <h2>Order summary</h2>
              <div><span>Subtotal</span><strong>{formatPrice(total)}</strong></div>
              <p>Shipping and taxes are calculated at checkout.</p>
              <button type="button" disabled>Continue to checkout</button>
            </aside>
          </div>
        )}
      </main>
    </>
  );
}
