export type Product = {
  slug: string;
  name: string;
  category: string;
  price: string;
  image: string;
  hoverImage?: string;
  alt: string;
  description: string;
  colors: { name: string; value: string }[];
};

export const products: Product[] = [
  {
    slug: 'moth-01',
    name: 'Moth 01',
    category: 'Outerwear',
    price: '৳350,000',
    image: 'https://www.image2url.com/r2/default/images/1791679358036-38b110ae-530f-4a8d-b81b-26d71a6462dd.png',
    hoverImage: 'https://www.image2url.com/r2/default/images/1791679466025-b895ac6e-c040-4e04-b629-8abc4f51ff99.png',
    alt: 'Moth 01 campaign look',
    description: 'A relaxed streetwear silhouette made for everyday wear. Moth 01 pairs a clean profile with considered details and a comfortable fit.',
    colors: [{ name: 'Smoke', value: '#454747' }, { name: 'Amber', value: '#9c7654' }],
  },
  {
    slug: 'scarab-01',
    name: 'Scarab 01',
    category: 'Outerwear',
    price: '৳390,000',
    image: 'https://www.image2url.com/r2/default/images/1791679726053-4af1ad91-85b4-4254-97c9-ee6bf73bb7b9.png',
    hoverImage: 'https://www.image2url.com/r2/default/images/1791679846989-31a54e64-94b2-444e-b355-8819beeed8cb.png',
    alt: 'Scarab 01 campaign look',
    description: 'A distinctive silhouette with a balanced shape and refined finish. Designed to bring a subtle point of view to your everyday rotation.',
    colors: [{ name: 'Black', value: '#242424' }, { name: 'Olive', value: '#555a48' }],
  },
  {
    slug: 'papillon-01',
    name: 'Papillon 01',
    category: 'Outerwear',
    price: '৳420,000',
    image: 'https://www.image2url.com/r2/default/images/1791680025460-2953f91a-1a19-425c-9d31-f12c0946169f.png',
    hoverImage: 'https://www.image2url.com/r2/default/images/1791679965924-0b2e1f46-2f1d-4c2a-a133-e15ff2f83d77.png',
    alt: 'Papillon 01 campaign look',
    description: 'A modern statement piece with softly sculpted lines. Papillon 01 is designed to feel effortless from the first light of day to late evening.',
    colors: [{ name: 'Ink', value: '#222326' }, { name: 'Stone', value: '#9b9688' }],
  },
  {
    slug: 'luna-01',
    name: 'Luna 01',
    category: 'Outerwear',
    price: '৳410,000',
    image: 'https://www.image2url.com/r2/default/images/1791680167510-5214b1a6-1424-46bf-a116-7b8708547f2a.png',
    hoverImage: 'https://www.image2url.com/r2/default/images/1791680203395-55d02efd-66f7-49fe-9103-cad86c141464.png',
    alt: 'Luna 01 campaign look',
    description: 'Clean proportions and a striking profile make Luna 01 an easy signature. Thoughtful construction keeps it comfortable throughout the day.',
    colors: [{ name: 'Midnight', value: '#252525' }, { name: 'Cocoa', value: '#755b4a' }],
  },
];
