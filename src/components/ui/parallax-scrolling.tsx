import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { Heart, ShoppingBag } from 'lucide-react';
import { SiteHeader } from '@/components/ui/site-header';
import { products } from '@/data/products';
import { useCart } from '@/components/ui/cart-context';

const layers = [
  { layer: '1', yPercent: 70 },
  { layer: '2', yPercent: 10 },
];

const brandNames = [
  'Nike',
  'Adidas',
  'Zara',
  'H&M',
  'Uniqlo',
  'Louis Vuitton',
  'Gucci',
  'Chanel',
  "Levi's",
  'Prada',
  'Ralph Lauren',
  'Tommy Hilfiger',
  'Burberry',
  'Balenciaga',
  'Calvin Klein',
];

export function ParallaxComponent() {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const { addItem } = useCart();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const root = parallaxRef.current;
    const triggerElement = root?.querySelector<HTMLElement>('[data-parallax-layers]');
    if (!root || !triggerElement) return;

    const context = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: triggerElement,
          start: '0% 0%',
          end: '100% 0%',
          scrub: true,
        },
      });

      layers.forEach(({ layer, yPercent }, index) => {
        timeline.to(
          triggerElement.querySelectorAll(`[data-parallax-layer="${layer}"]`),
          { yPercent, ease: 'none' },
          index === 0 ? undefined : '<',
        );
      });
    }, root);

    const lenis = new Lenis();
    const onScroll = () => ScrollTrigger.update();
    const onTick = (time: number) => lenis.raf(time * 1000);
    lenis.on('scroll', onScroll);
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off('scroll', onScroll);
      gsap.ticker.remove(onTick);
      lenis.destroy();
      context.revert();
    };
  }, []);

  return (
    <>
      <SiteHeader />
      <main className="parallax" ref={parallaxRef}>
      <section className="parallax__header" aria-label="New season collection">
        <div className="parallax__visuals">
          <div data-parallax-layers className="parallax__layers">
            <div data-parallax-layer="1" className="parallax__layer-title">
              <h1 className="parallax__title">NEW SEASON</h1>
            </div>
            <img
              src="/model-new-source.png"
              loading="eager"
              fetchPriority="high"
              data-parallax-layer="2"
              alt="Model wearing a black hoodie"
              className="parallax__subject"
            />
          </div>
          <div className="parallax__promo">
            <h2>New Collection</h2>
            <p>Grab our iconic style today!</p>
            <a className="parallax__cta" href="#collection">Shop Now</a>
          </div>
        </div>
      </section>
      <section className="brand-strip" aria-label="Featured brands">
        <div className="brand-strip__track">
          {[0, 1].map((copy) => (
            <div className="brand-strip__group" key={copy} aria-hidden={copy === 1}>
              {brandNames.map((name) => <span className="brand-strip__name" key={name}>{name}</span>)}
            </div>
          ))}
        </div>
      </section>
      <section className="morphee-collection" id="collection" aria-labelledby="morphee-title">
        <div className="morphee-collection__intro">
          <h2 id="morphee-title">New arrivals, new journeys.</h2>
          <p>Beyond trends, beyond limits — define your own identity.</p>
        </div>
        <div className="morphee-collection__grid">
          {products.map((product) => (
            <article className={`morphee-product${product.hoverImage ? ' morphee-product--has-hover-image' : ''}`} key={product.name}>
              <a className="morphee-product__image-link" href={`/product/${product.slug}`} aria-label={`View ${product.name}`}>
                <div className="morphee-product__image-wrap">
                  <img className="morphee-product__image morphee-product__image--default" src={product.image} alt={product.alt} loading="lazy" />
                  {product.hoverImage && (
                    <img className="morphee-product__image morphee-product__image--hover" src={product.hoverImage} alt="" loading="lazy" aria-hidden="true" />
                  )}
                </div>
              </a>
              <div className="morphee-product__details">
                <div>
                  <h3><a className="morphee-product__name-link" href={`/product/${product.slug}`}>{product.name}</a></h3>
                  <p>{product.price}</p>
                </div>
                <div className="morphee-product__actions">
                  <button type="button" aria-label={`Add ${product.name} to wishlist`}><Heart aria-hidden="true" /></button>
                  <button type="button" aria-label={`Add ${product.name} to bag`} onClick={() => addItem(product)}><ShoppingBag aria-hidden="true" /></button>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="morphee-collection__feature-image">
          <img
            src="/images/xpoint-elevator-campaign.jpg"
            alt="XPoint streetwear campaign featuring two models"
            loading="lazy"
          />
        </div>
      </section>
      <section className="brand-strip" aria-label="XPoint brand strip">
        <div className="brand-strip__track">
          {[0, 1].map((copy) => (
            <div className="brand-strip__group" key={copy} aria-hidden={copy === 1}>
              {Array.from({ length: 6 }, (_, index) => (
                <span className="brand-strip__name" key={`${copy}-${index}`}>XPOINT.</span>
              ))}
            </div>
          ))}
        </div>
      </section>
      </main>
    </>
  );
}
