export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  micro: string; // gen-z micro-copy
  stock: "in" | "low";
};

const u = (id: string, w = 900, h = 1200) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;

export const products: Product[] = [
  {
    id: "veil-coat",
    name: "Veil Wool Overcoat",
    price: 18900,
    image: u("1551488831-00ddcb6c6bd3"),
    category: "Outerwear",
    description:
      "Double-faced Italian wool, cut long and clean. Cocooning shoulders, hidden placket, weight that feels like a hug from someone tall.",
    micro: "yeah, it's that good.",
    stock: "low",
  },
  {
    id: "ghost-trouser",
    name: "Ghost Pleated Trouser",
    price: 7490,
    image: u("1490481651871-ab68de25d43d"),
    category: "Bottoms",
    description: "High-rise, deep pleats, ankle break. Drapes like liquid, costs less than your therapist.",
    micro: "your hips will thank you.",
    stock: "in",
  },
  {
    id: "aurveil-tee",
    name: "Aurveil Heavyweight Tee",
    price: 2890,
    image: u("1521572163474-6864f9cf17ab"),
    category: "Tops",
    description: "320 gsm, washed cotton, boxy fit. The plain tee you'll quietly steal from yourself.",
    micro: "the one. literally.",
    stock: "in",
  },
  {
    id: "midnight-loafer",
    name: "Midnight Calf Loafer",
    price: 14200,
    image: u("1543163521-1bf539c55dd2"),
    category: "Footwear",
    description: "Hand-finished calf leather, almond toe, brushed gold bit. For meetings and 2am walks.",
    micro: "small heel, big energy.",
    stock: "low",
  },
  {
    id: "soft-knit",
    name: "Soft Cashmere Knit",
    price: 9800,
    image: u("1434389677669-e08b4cac3105"),
    category: "Tops",
    description: "Mongolian cashmere, ribbed cuffs, oversized. The kind of soft that makes flights survivable.",
    micro: "feels illegal.",
    stock: "in",
  },
  {
    id: "noir-slip",
    name: "Noir Bias Slip Dress",
    price: 11200,
    image: u("1490481651871-ab68de25d43d", 800, 1100),
    category: "Dresses",
    description: "Silk-blend bias cut, cowl neck, low back. Reads dinner reservation; pairs with sneakers.",
    micro: "ruins everyone's evening.",
    stock: "low",
  },
  {
    id: "vault-bag",
    name: "Vault Mini Shoulder Bag",
    price: 16500,
    image: u("1584917865442-de89df76afd3"),
    category: "Bags",
    description: "Vegetable-tanned leather, magnetic closure, gold-tone hardware. Fits a phone, lipgloss, attitude.",
    micro: "small bag, big agenda.",
    stock: "in",
  },
  {
    id: "haze-sunglass",
    name: "Haze Acetate Sunglasses",
    price: 4400,
    image: u("1572635196237-14b3f281503f"),
    category: "Accessories",
    description: "Italian acetate, square frame, brown-fade lenses. The hangover sunglasses that look intentional.",
    micro: "low effort, high serve.",
    stock: "in",
  },
  {
    id: "linen-shirt",
    name: "Off-Hours Linen Shirt",
    price: 5200,
    image: u("1542060748-10c28b62716f"),
    category: "Tops",
    description: "European linen, camp collar, mother-of-pearl buttons. Built for balconies.",
    micro: "vacation-coded.",
    stock: "in",
  },
];

export const getProduct = (id: string) => products.find((p) => p.id === id);

export const formatINR = (n: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);
