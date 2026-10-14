import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, Heart, Minus, Plus, ShoppingBag } from 'lucide-react';
import { SiteHeader } from '@/components/ui/site-header';
import { ProductPageFooter } from '@/components/ui/product-page-footer';
import { products } from '@/data/products';
import { useCart } from '@/components/ui/cart-context';

export function ProductDetailPage({ slug }: { slug: string }) {
  const { addItem } = useCart();
  const product = products.find((item) => item.slug === slug);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedImage, setSelectedImage] = useState(product?.image ?? '');
  const [added, setAdded] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setSelectedImage(product?.image ?? '');
    setSelectedSize('M');
    setSelectedColor(0);
    setQuantity(1);
    setAdded(false);
    setSaved(false);
  }, [slug]);

  if (!product) {
    return (
      <>
        <SiteHeader />
        <main className="product-page product-page--not-found">
          <h1>We couldn’t find that frame.</h1>
          <a href="/#collection">Back to the collection</a>
        </main>
        <ProductPageFooter />
      </>
    );
  }

  const recommendations = products.filter((item) => item.slug !== product.slug);

  return (
    <>
      <SiteHeader />
      <main className="product-page">
        <div className="product-page__panel">
          <a className="product-page__back" href="/#collection">
            <ArrowLeft aria-hidden="true" />
            Back to collection
          </a>

          <div className="product-detail__layout">
            <div className="product-detail__visual">
              <img src={selectedImage} alt={product.alt} fetchPriority="high" />
              {product.hoverImage && (
                <button
                  className="product-detail__next-image"
                  type="button"
                  aria-label="Show next product image"
                  onClick={() => setSelectedImage((image) => image === product.image ? product.hoverImage! : product.image)}
                >
                  <ArrowRight aria-hidden="true" />
                </button>
              )}
            </div>

            <section className="product-detail__info" aria-labelledby="product-title">
              <p className="product-detail__category">{product.category}</p>
              <h1 id="product-title">{product.name}</h1>
              <p className="product-detail__description">{product.description}</p>

              <div className="product-detail__colors">
                <p>Color <span>{product.colors[selectedColor].name}</span></p>
                <div className="product-detail__swatches" role="group" aria-label="Choose a frame color">
                  {product.colors.map((color, index) => (
                    <button
                      className={`product-detail__swatch${selectedColor === index ? ' is-selected' : ''}`}
                      key={color.name}
                      type="button"
                      style={{ backgroundColor: color.value }}
                      aria-label={color.name}
                      aria-pressed={selectedColor === index}
                      onClick={() => setSelectedColor(index)}
                    />
                  ))}
                </div>
              </div>

              <div className="product-detail__sizes">
                <div className="product-detail__size-heading">
                  <p>Size <span>{selectedSize}</span></p>
                  <button type="button" onClick={() => document.getElementById('size-guide')?.scrollIntoView({ behavior: 'smooth', block: 'center' })}>Size guide</button>
                </div>
                <div className="product-detail__size-options" role="group" aria-label="Choose a size">
                  {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                    <button
                      className={`product-detail__size${selectedSize === size ? ' is-selected' : ''}`}
                      key={size}
                      type="button"
                      aria-pressed={selectedSize === size}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <p className="product-detail__price">{product.price}</p>
              <div className="product-detail__purchase-row">
                <button className="product-detail__add" type="button" onClick={() => { addItem(product, quantity, selectedSize, selectedColor); setAdded(true); }}>
                  <ShoppingBag aria-hidden="true" />
                  {added ? 'Added to bag' : 'Add to bag'}
                </button>
                <div className="product-detail__quantity" aria-label="Quantity">
                  <button type="button" aria-label="Decrease quantity" onClick={() => setQuantity((value) => Math.max(1, value - 1))}>
                    <Minus aria-hidden="true" />
                  </button>
                  <span aria-live="polite">{quantity}</span>
                  <button type="button" aria-label="Increase quantity" onClick={() => setQuantity((value) => value + 1)}>
                    <Plus aria-hidden="true" />
                  </button>
                </div>
                <button
                  className={`product-detail__save${saved ? ' is-saved' : ''}`}
                  type="button"
                  aria-label={saved ? 'Remove from favorites' : 'Add to favorites'}
                  aria-pressed={saved}
                  onClick={() => setSaved((value) => !value)}
                >
                  <Heart aria-hidden="true" />
                </button>
              </div>

              <div className="product-detail__accordions">
                <details open>
                  <summary>Details</summary>
                  <p>Thoughtful construction and an easy, comfortable fit, finished with XPoint signature detailing.</p>
                </details>
                <details>
                  <summary>Store availability</summary>
                  <p>Available online. Contact us for current availability at an XPoint stockist.</p>
                </details>
                <details>
                  <summary>Care and use</summary>
                  <p>Follow the care label inside the garment to keep your piece looking its best.</p>
                </details>
                <details id="size-guide">
                  <summary>Size guide</summary>
                  <p>Choose your usual size for a relaxed fit. If you prefer a closer fit, consider sizing down.</p>
                </details>
              </div>
            </section>
          </div>

          <section className="product-related" aria-labelledby="product-related-title">
            <div className="product-related__heading">
              <h2 id="product-related-title">You may also like</h2>
              <a href="/#collection">View collection</a>
            </div>
            <div className="product-related__grid">
              {recommendations.map((item) => (
                <a className="product-related__card" href={`/product/${item.slug}`} key={item.slug}>
                  <div className="product-related__image">
                    <img src={item.image} alt={item.alt} loading="lazy" />
                  </div>
                  <div className="product-related__caption">
                    <span>{item.name}</span>
                    <span>{item.price}</span>
                  </div>
                </a>
              ))}
            </div>
          </section>
        </div>
      </main>
      <ProductPageFooter />
    </>
  );
}
