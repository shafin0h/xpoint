const CATEGORY_LINKS = ['Man', 'Woman', 'T-Shirts', 'Pants', 'Long Sleeves'];

const LINK_COLUMNS: { label: string; links: string[] }[] = [
  {
    label: 'Company',
    links: ['About', 'Account', 'Help', 'Contact', 'Gift Card', 'Reward Club', 'Track Your Order'],
  },
  {
    label: 'Support',
    links: [
      'Shipping',
      'My Returns',
      'Size Guide',
      'Stockists',
      'Accessibility Statement',
      'Cookie Policy',
      'Privacy Policy',
      'Sitemap',
    ],
  },
  {
    label: 'Legal',
    links: [
      'Community Event',
      'Terms and Conditions',
      'Website Terms of Use',
      'Rewards Club T and Cs',
      "Rewards Club FAQ's",
      'FAQ',
    ],
  },
];

const SOCIAL_LINKS = ['Facebook', 'TikTok', 'Instagram', 'X'];
const LEGAL_LINKS = ['Privacy and Policy', 'Term and Condition'];

const smallText =
  'text-[11px] uppercase leading-tight tracking-[0.03em] transition-colors';
const mainLink =
  'text-[13px] uppercase leading-tight tracking-[0.02em] text-neutral-800 transition-colors hover:text-neutral-500';

export function SiteFooter() {
  return (
    <footer id="contact" className="w-full bg-white text-neutral-800">
      <div className="px-4 pt-8">
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-[39fr_22fr_24fr_minmax(12.5rem,15fr)] lg:gap-x-0">
          <nav aria-label="Categories">
            <h3 className={`${smallText} text-neutral-500`}>Categories</h3>
            <ul className="mt-[13px] space-y-[13px]">
              {CATEGORY_LINKS.map((label) => (
                <li key={label}>
                  <a
                    href="#"
                    className={`${smallText} block text-neutral-500 hover:text-neutral-900`}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {LINK_COLUMNS.map((column) => (
            <nav key={column.label} aria-label={column.label}>
              <ul className="space-y-[19px]">
                {column.links.map((label) => (
                  <li key={label}>
                    <a href="#" className={`${mainLink} block`}>
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-17 flex flex-col gap-4 md:grid md:grid-cols-[1fr_auto_1fr] md:items-center">
          <ul className="flex flex-wrap items-center gap-4.5">
            {SOCIAL_LINKS.map((label) => (
              <li key={label}>
                <a
                  href="#"
                  className={`${smallText} text-neutral-800 hover:text-neutral-500`}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          <p className={`${smallText} text-neutral-500 md:text-center`}>
            Copyright 2024 XPOINT
          </p>

          <ul className="flex flex-wrap items-center gap-6 md:justify-end">
            {LEGAL_LINKS.map((label) => (
              <li key={label}>
                <a
                  href="#"
                  className={`${smallText} text-neutral-500 hover:text-neutral-900`}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-8 px-4 md:mt-12">
        <svg
          viewBox="0 0 1000 107"
          className="block h-auto w-full overflow-hidden"
          role="img"
          aria-label="XPOINT"
        >
          <text
            x="0"
            y="115"
            fontSize="158"
            fontWeight="700"
            textLength="1000"
            lengthAdjust="spacingAndGlyphs"
            textRendering="geometricPrecision"
            className="fill-neutral-800 font-sans"
          >
            XPOINT
          </text>
        </svg>
      </div>
    </footer>
  );
}
