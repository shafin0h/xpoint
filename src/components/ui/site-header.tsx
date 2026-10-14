import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, ChevronDown, Heart, Menu, Search, ShoppingBag, UserRound, X } from 'lucide-react';
import { useCart } from '@/components/ui/cart-context';

const navLinks = [
  { label: 'Home', href: '/#home' },
  { label: 'Shop by', href: '/#collection', menu: true },
  { label: 'Collections', href: '/#collection' },
  { label: 'Our Story', href: '/#collection' },
  { label: 'Contact', href: '/#contact', menu: true },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { items } = useCart();
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMobileMenu = () => setMobileOpen(false);

  return (
    <>
      <header className={`site-nav${scrolled ? ' site-nav--scrolled' : ''}`} id="home">
        <nav className="site-nav__inner" aria-label="Main navigation">
          <div className="site-nav__links">
            <div className="site-nav__primary-links">
              {navLinks.map((link, index) => (
                <a
                  className={`site-nav__link${index === 0 ? ' site-nav__link--active' : ''}${link.menu ? ' site-nav__link--has-menu' : ''}`}
                  href={link.href}
                  key={link.label}
                >
                  {link.label}
                  {link.menu && <ChevronDown aria-hidden="true" />}
                </a>
              ))}
            </div>
          </div>

          <button
            className="site-nav__menu"
            type="button"
            aria-label="Open navigation menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(true)}
          >
            <Menu aria-hidden="true" />
          </button>

          <a className="site-nav__logo" href="/#home" aria-label="XPoint home">
            <img src="/brand-logo.png" alt="XPoint" />
          </a>

          <div className="site-nav__actions" aria-label="Shopping tools">
            <button type="button" aria-label="Search"><Search aria-hidden="true" /></button>
            <button className="site-nav__account" type="button" aria-label="Account"><UserRound aria-hidden="true" /></button>
            <button className="site-nav__favorites" type="button" aria-label="Favorites"><Heart aria-hidden="true" /></button>
            <a href="/cart" aria-label={`Open shopping bag${itemCount ? `, ${itemCount} items` : ''}`}><ShoppingBag aria-hidden="true" />{itemCount > 0 && <span className="site-nav__bag-count">{itemCount}</span>}</a>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="site-nav__mobile"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
          >
            <div className="site-nav__mobile-inner">
              <div className="site-nav__mobile-top">
                <img src="/brand-logo.png" alt="XPoint" />
                <button type="button" onClick={closeMobileMenu} aria-label="Close navigation menu">
                  <X aria-hidden="true" />
                </button>
              </div>

              <nav className="site-nav__mobile-links" aria-label="Mobile navigation">
                {navLinks.map((link, index) => (
                  <motion.a
                    href={link.href}
                    key={link.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 12 }}
                    transition={{ delay: index * 0.045 + 0.05, duration: 0.24 }}
                    onClick={closeMobileMenu}
                  >
                    {link.label}
                    <ArrowUpRight aria-hidden="true" />
                  </motion.a>
                ))}
              </nav>

              <div className="site-nav__mobile-footer">
                <p>XPOINT</p>
                <p>Luxury streetwear</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </>
  );
}
