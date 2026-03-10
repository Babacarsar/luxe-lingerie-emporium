import collectionLingerie from "@/assets/collection-lingerie.jpg";
import collectionRobe from "@/assets/collection-robe.jpg";
import collectionPagne from "@/assets/collection-pagne.jpg";
import collectionEnsembles from "@/assets/collection-ensembles.jpg";
import collectionNuisettes from "@/assets/collection-nuisettes.jpg";
import collectionBodys from "@/assets/collection-bodys.jpg";
import sophie1 from "@/assets/sophie-1.jpg";
import rama1 from "@/assets/rama-1.jpg";
import sosso1 from "@/assets/sosso-1.jpg";
import nabou1 from "@/assets/nabou-1.jpg";
import ouleye1 from "@/assets/ouleye-1.jpg";
import mina1 from "@/assets/mina-1.jpg";
import oumou1 from "@/assets/oumou-1.jpg";
import thiouraye1 from "@/assets/thiouraye-1.jpg";
import thiouraye2 from "@/assets/thiouraye-2.jpg";
import thiouraye3 from "@/assets/thiouraye-3.jpg";
import thiouraye4 from "@/assets/thiouraye-4.jpg";
import thiouraye5 from "@/assets/thiouraye-5.jpg";
import codouBinbin1 from "@/assets/codou-binbin-1.jpg";
import codouBinbin2 from "@/assets/codou-binbin-2.jpg";
import mariemeBinbin1 from "@/assets/marieme-binbin-1.jpg";
import mariemeBinbin2 from "@/assets/marieme-binbin-2.jpg";
import awaBinbin1 from "@/assets/awa-binbin-1.jpg";
import awaBinbin2 from "@/assets/awa-binbin-2.jpg";
import ndeyeBinbin1 from "@/assets/ndeye-binbin-1.jpg";
import ndeyeBinbin2 from "@/assets/ndeye-binbin-2.jpg";
import kineBinbin1 from "@/assets/kiné-binbin-1.jpg";
import editorial1 from "@/assets/editorial-1.jpg";
import editorial2 from "@/assets/editorial-2.jpg";
import khadija1 from "@/assets/khadija-1.jpg";
import khadija2 from "@/assets/khadija-2.jpg";
import salimata1 from "@/assets/salimata-1.jpg";
import salimata2 from "@/assets/salimata-2.jpg";
import fatima1 from "@/assets/fatima-1.jpg";
import fatima2 from "@/assets/fatima-2.jpg";
import codou1 from "@/assets/codou-1.jpg";
import codou2 from "@/assets/codou-2.jpg";
import maguette1 from "@/assets/maguette-1.jpg";
import maguette2 from "@/assets/maguette-2.jpg";
import bintou1 from "@/assets/bintou-1.jpg";
import bintou2 from "@/assets/bintou-2.jpg";
import marieme1 from "@/assets/marieme-1.jpg";
import marieme2 from "@/assets/marieme-2.jpg";
import coura1 from "@/assets/coura-1.jpg";
import coura2 from "@/assets/coura-2.jpg";
import abibatou1 from "@/assets/abibatou-1.jpg";
import abibatou2 from "@/assets/abibatou-2.jpg";
import neneBella1 from "@/assets/nene-bella-1.jpg";
import neneBella2 from "@/assets/nene-bella-2.jpg";
import soukeyna1 from "@/assets/soukeyna-1.jpg";
import soukeyna2 from "@/assets/soukeyna-2.jpg";
import soukeyna3 from "@/assets/soukeyna-3.jpg";
import gnilane1 from "@/assets/gnilane-1.jpg";
import gnilane2 from "@/assets/gnilane-2.jpg";
import gnilane3 from "@/assets/gnilane-3.jpg";
import dior1 from "@/assets/dior-1.jpg";
import dior2 from "@/assets/dior-2.jpg";
import dior3 from "@/assets/dior-3.jpg";

export interface MockProduct {
  node: {
    id: string;
    title: string;
    description: string;
    handle: string;
    productType: string;
    priceRange: { minVariantPrice: { amount: string; currencyCode: string } };
    images: { edges: Array<{ node: { url: string; altText: string | null } }> };
    variants: { edges: Array<{ node: { id: string; title: string; price: { amount: string; currencyCode: string }; availableForSale: boolean; selectedOptions: Array<{ name: string; value: string }> } }> };
    options: Array<{ name: string; values: string[] }>;
  };
}

const sizes = ["S", "M", "L", "XL", "XXL"];
const makeVariants = (price: string, sizeList = sizes) =>
  sizeList.map((s, i) => ({
    node: {
      id: `variant-${s}-${i}-${Math.random().toString(36).slice(2, 8)}`,
      title: s,
      price: { amount: price, currencyCode: "XOF" },
      availableForSale: true,
      selectedOptions: [{ name: "Taille", value: s }],
    },
  }));

const makeProduct = (
  id: string,
  title: string,
  handle: string,
  price: string,
  type: string,
  description: string,
  images: string[],
  sizeList?: string[]
): MockProduct => ({
  node: {
    id,
    title,
    description,
    handle,
    productType: type,
    priceRange: { minVariantPrice: { amount: price, currencyCode: "XOF" } },
    images: { edges: images.map((url) => ({ node: { url, altText: title } })) },
    variants: { edges: makeVariants(price, sizeList) },
    options: [{ name: "Taille", values: sizeList || sizes }],
  },
});

export const mockProducts: MockProduct[] = [
  // ─── Lingerie Sexy ───
  makeProduct("36", "Khadija", "khadija", "20000", "lingerie-sexy", "Lingerie Khadija en dentelle noire transparente avec franges et détails raffinés. Élégance et sensualité.", [khadija1, khadija2]),
  makeProduct("37", "Salimata", "salimata", "20000", "lingerie-sexy", "Ensemble Salimata en dentelle noire avec franges et perles. Un look audacieux et glamour.", [salimata1, salimata2]),
  makeProduct("38", "Fatima", "fatima", "22000", "lingerie-sexy", "Body Fatima en dentelle florale transparente avec franges. Sensualité et raffinement.", [fatima1, fatima2]),
  makeProduct("39", "Codou", "codou", "25000", "lingerie-sexy", "Déshabillé Codou en voile transparent brodé de fleurs rouges et noires. Élégance absolue.", [codou1, codou2]),
  makeProduct("40", "Maguette", "maguette", "23000", "lingerie-sexy", "Nuisette longue Maguette en dentelle noire avec dos nu. Glamour et sophistication.", [maguette1, maguette2]),
  makeProduct("41", "Bintou", "bintou", "22000", "lingerie-sexy", "Déshabillé Bintou en tulle noir brodé de fleurs. Transparence et élégance sensuelle.", [bintou1, bintou2]),
  makeProduct("42", "Marième", "marieme", "25000", "lingerie-sexy", "Peignoir Marième en voile blanc avec manches papillon en dentelle florale. Romantisme absolu.", [marieme1, marieme2]),
  makeProduct("43", "Coura", "coura", "24000", "lingerie-sexy", "Kimono Coura en mousseline rouge avec broderies dorées et dos ouvert en cœur. Passion et audace.", [coura1, coura2]),
  makeProduct("44", "Abibatou", "abibatou", "20000", "lingerie-sexy", "Robe transparente Abibatou en dentelle blanche avec col halter et fente latérale. Charme irrésistible.", [abibatou1, abibatou2]),
  makeProduct("45", "Néné Bella", "nene-bella", "23000", "lingerie-sexy", "Déshabillé Néné Bella en voile blanc avec décolleté plongeant et dentelle délicate. Glamour festif.", [neneBella1, neneBella2]),

  // ─── Robes ───
  makeProduct("46", "Soukeyna", "soukeyna", "28000", "robe", "Robe confort Soukeyna en satin blanc avec bretelles en dentelle noire brodée et dos nu élégant. Raffinement et douceur.", [soukeyna1, soukeyna2, soukeyna3]),
  makeProduct("47", "Gnilane", "gnilane", "30000", "robe", "Robe confort Gnilane en satin blanc avec bustier en dentelle fine et dos ouvert. Élégance romantique.", [gnilane1, gnilane2, gnilane3]),
  makeProduct("48", "Dior", "dior", "32000", "robe", "Robe confort Dior en tulle doré avec motif craquelé et broderies florales. Glamour et sophistication.", [dior1, dior2, dior3]),

  // ─── Pagnes ───
  makeProduct("15", "Sophie", "sophie", "18000", "pagne", "Pagne Sophie en tissu bleu ciel avec crochet ajouré et perles violettes. Élégance et fraîcheur.", [sophie1]),
  makeProduct("16", "Rama", "rama", "20000", "pagne", "Pagne Rama en bazin blanc avec crochet artisanal et bin bin en perles dorées. Raffinement traditionnel.", [rama1]),
  makeProduct("17", "Sosso", "sosso", "25000", "pagne", "Pagne Sosso en bazin blanc orné de perles cristal et pendentifs. Luxe et sophistication pour grandes occasions.", [sosso1]),
  makeProduct("18", "Nabou", "nabou", "22000", "pagne", "Pagne Nabou en satin noir avec broderies de perles dorées et bin bin assortis. Élégance audacieuse.", [nabou1]),
  makeProduct("19", "Ouleye", "ouleye", "28000", "pagne", "Pagne Ouleye en bazin ivoire avec broderies de perles nacrées et broche fleur de lys. Prestige absolu.", [ouleye1]),
  makeProduct("49", "Mina", "mina", "23000", "pagne", "Pagne Mina en satin blanc avec franges de perles nacrées en cascade. Glamour et féminité.", [mina1]),
  makeProduct("50", "Oumou", "oumou", "24000", "pagne", "Pagne Oumou en dentelle rouge passion avec franges et bin bin cristal. Audace et sensualité.", [oumou1]),

  // ─── Thiouraye ───
  makeProduct("20", "Thiouraye Oud Royal", "thiouraye-oud-royal", "12000", "thiouraye", "Encens premium à base de bois d'oud et de musc. Fragrance envoûtante longue durée.", [thiouraye1, thiouraye2], ["50g", "100g", "200g"]),
  makeProduct("21", "Thiouraye Fleur de Niébé", "thiouraye-fleur-niebe", "8000", "thiouraye", "Mélange traditionnel sénégalais aux notes florales douces et boisées.", [thiouraye2, thiouraye3], ["50g", "100g"]),
  makeProduct("22", "Thiouraye Ambre & Santal", "thiouraye-ambre-santal", "10000", "thiouraye", "Alliance subtile d'ambre chaud et de santal crémeux. Idéal pour la maison.", [thiouraye3, thiouraye4], ["50g", "100g", "200g"]),
  makeProduct("23", "Coffret Découverte 5 Parfums", "coffret-thiouraye-decouverte", "25000", "thiouraye", "Coffret luxe contenant 5 variétés de thiouraye premium en mini formats.", [thiouraye4, thiouraye5], ["Coffret"]),
  makeProduct("24", "Thiouraye Musc Blanc Intense", "thiouraye-musc-blanc", "9000", "thiouraye", "Encens au musc blanc pur. Notes poudrées et enveloppantes.", [thiouraye5, thiouraye1], ["50g", "100g"]),
  makeProduct("25", "Thiouraye Rose du Sahel", "thiouraye-rose-sahel", "11000", "thiouraye", "Fragrance rare à base de rose du Sahel et de bois précieux africains.", [thiouraye1, thiouraye3], ["50g", "100g"]),

  // ─── Bin Bin ───
  makeProduct("51", "Codou", "codou-binbin", "15000", "binbin", "Bin bin Codou en perles rouges, blanches et dorées avec pendentifs figurines et lettres. Audace et passion.", [codouBinbin1, codouBinbin2], ["S (60-70cm)", "M (70-80cm)", "L (80-90cm)", "XL (90-100cm)"]),
  makeProduct("52", "Marème", "mareme-binbin", "12000", "binbin", "Bin bin Marème en perles noires et ambrées avec chaînettes dorées. Élégance mystérieuse et raffinée.", [mariemeBinbin1, mariemeBinbin2], ["S (60-70cm)", "M (70-80cm)", "L (80-90cm)", "XL (90-100cm)"]),
];

const categoryMapping: Record<string, string[]> = {
  "lingerie-sexy": ["lingerie-sexy"],
  "robe": ["robe"],
  "pagne": ["pagne"],
  "thiouraye": ["thiouraye"],
  "binbin": ["binbin", "binbin-epaisses", "binbin-fins"],
  "binbin-epaisses": ["binbin-epaisses"],
  "binbin-fins": ["binbin-fins"],
};

export function getMockProducts(category?: string): MockProduct[] {
  if (!category || category === "all") return mockProducts;
  const types = categoryMapping[category];
  if (!types) return mockProducts;
  return mockProducts.filter((p) => types.includes(p.node.productType));
}

export function getMockProductByHandle(handle: string): MockProduct["node"] | null {
  const found = mockProducts.find((p) => p.node.handle === handle);
  return found ? found.node : null;
}
