import { AudioLines, BriefcaseBusiness, Camera, MessageCircleMore } from 'lucide-react';

const footerLinks = ['Shipping', 'Returns', 'FAQs', 'Terms', 'Privacy'];

export function ProductPageFooter() {
  return (
    <footer className="product-footer" id="contact">
      <div className="product-footer__newsletter">
        <a className="product-footer__wordmark" href="/#home" aria-label="XPoint home">
          XPOINT
        </a>
        <p className="product-footer__tagline">
          Be the first to know when new pieces arrive and get early access.
        </p>
        <form className="product-footer__form" onSubmit={(event) => event.preventDefault()}>
          <label className="sr-only" htmlFor="product-footer-email">Email address</label>
          <input id="product-footer-email" type="email" placeholder="E-MAIL" autoComplete="email" />
          <button type="submit">Subscribe</button>
        </form>
      </div>

      <nav className="product-footer__links" aria-label="Footer links">
        {footerLinks.map((label) => (
          <a href="/#contact" key={label}>{label}</a>
        ))}
      </nav>

      <ul className="product-footer__socials" aria-label="Social media">
        <li><a href="#" aria-label="Instagram"><Camera aria-hidden="true" /></a></li>
        <li><a href="#" aria-label="TikTok"><AudioLines aria-hidden="true" /></a></li>
        <li><a href="#" aria-label="LinkedIn"><BriefcaseBusiness aria-hidden="true" /></a></li>
        <li><a href="#" aria-label="Community"><MessageCircleMore aria-hidden="true" /></a></li>
      </ul>

      <p className="product-footer__copyright">XPOINT © 2026. ALL RIGHTS RESERVED.</p>
    </footer>
  );
}
