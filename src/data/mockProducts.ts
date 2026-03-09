import collectionLingerie from "@/assets/collection-lingerie.jpg";
import collectionRobe from "@/assets/collection-robe.jpg";
import collectionPagne from "@/assets/collection-pagne.jpg";
import collectionEnsembles from "@/assets/collection-ensembles.jpg";
import collectionNuisettes from "@/assets/collection-nuisettes.jpg";
import collectionBodys from "@/assets/collection-bodys.jpg";
import thiouraye1 from "@/assets/thiouraye-1.jpg";
import thiouraye2 from "@/assets/thiouraye-2.jpg";
import thiouraye3 from "@/assets/thiouraye-3.jpg";
import thiouraye4 from "@/assets/thiouraye-4.jpg";
import thiouraye5 from "@/assets/thiouraye-5.jpg";
import binBin1 from "@/assets/bin-bin-1.jpg";
import binBin2 from "@/assets/bin-bin-2.jpg";
import binBin3 from "@/assets/bin-bin-3.jpg";
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
  makeProduct("1", "Ensemble Dentelle Noire Séduction", "ensemble-dentelle-noire", "15000", "lingerie-sexy", "Ensemble lingerie en dentelle noire délicate avec détails dorés. Soutien-gorge push-up et culotte assortie.", [collectionLingerie, editorial1]),
  makeProduct("2", "Body Satin Bordeaux", "body-satin-bordeaux", "18000", "lingerie-sexy", "Body en satin bordeaux avec dos nu plongeant et finitions en dentelle Chantilly.", [collectionBodys, editorial2]),
  makeProduct("3", "Nuisette Soie Champagne", "nuisette-soie-champagne", "22000", "lingerie-sexy", "Nuisette longue en soie champagne avec fente latérale et broderies artisanales.", [collectionNuisettes, collectionLingerie]),
  makeProduct("4", "Ensemble Floral Rose Poudré", "ensemble-floral-rose", "14000", "lingerie-sexy", "Ensemble deux pièces en dentelle florale rose poudré. Confort et élégance au quotidien.", [editorial1, collectionEnsembles]),
  makeProduct("5", "Corset Velours Émeraude", "corset-velours-emeraude", "25000", "lingerie-sexy", "Corset structuré en velours émeraude avec baleines souples et laçage dos.", [editorial2, collectionLingerie]),
  makeProduct("6", "Guêpière Dentelle Ivoire", "guepiere-dentelle-ivoire", "20000", "lingerie-sexy", "Guêpière romantique en dentelle ivoire, parfaite pour les occasions spéciales.", [collectionEnsembles, editorial1]),
  makeProduct("7", "Ensemble Sport Chic Noir", "ensemble-sport-chic", "12000", "lingerie-sexy", "Brassière et shorty en microfibre noire avec bandes élastiques dorées.", [collectionBodys, collectionLingerie]),
  makeProduct("8", "Babydoll Mousseline Lavande", "babydoll-mousseline-lavande", "16000", "lingerie-sexy", "Babydoll aérien en mousseline lavande avec nœud satin et culotte string assortie.", [collectionNuisettes, editorial2]),
  makeProduct("36", "Khadija", "khadija", "20000", "lingerie-sexy", "Lingerie Khadija en dentelle noire transparente avec franges et détails raffinés. Élégance et sensualité.", [khadija1, khadija2]),
  makeProduct("37", "Salimata", "salimata", "20000", "lingerie-sexy", "Ensemble Salimata en dentelle noire avec franges et perles. Un look audacieux et glamour.", [salimata1, salimata2]),
  makeProduct("38", "Fatima", "fatima", "22000", "lingerie-sexy", "Body Fatima en dentelle florale transparente avec franges. Sensualité et raffinement.", [fatima1, fatima2]),
  makeProduct("39", "Codou", "codou", "25000", "lingerie-sexy", "Déshabillé Codou en voile transparent brodé de fleurs rouges et noires. Élégance absolue.", [codou1, codou2]),
  makeProduct("40", "Maguette", "maguette", "23000", "lingerie-sexy", "Nuisette longue Maguette en dentelle noire avec dos nu. Glamour et sophistication.", [maguette1, maguette2]),

  // ─── Robes ───
  makeProduct("9", "Robe Wax Élégance Ankara", "robe-wax-elegance", "28000", "robe", "Robe longue en wax premium motif Ankara. Coupe ajustée avec évasement en bas.", [collectionRobe, collectionPagne]),
  makeProduct("10", "Robe Cocktail Satin Or", "robe-cocktail-satin-or", "35000", "robe", "Robe de cocktail en satin doré avec drapé asymétrique et dos nu.", [editorial1, collectionRobe]),
  makeProduct("11", "Robe Chemise Bazin Blanc", "robe-chemise-bazin", "24000", "robe", "Robe chemise en bazin riche blanc brodé. Ceinture amovible en tissu assorti.", [collectionRobe, editorial2]),
  makeProduct("12", "Robe Longue Kente Multicolore", "robe-kente-multicolore", "32000", "robe", "Robe majestueuse en tissu Kente authentique. Épaules structurées et jupe ample.", [collectionPagne, collectionRobe]),
  makeProduct("13", "Robe Fourreau Velours Bordeaux", "robe-fourreau-velours", "30000", "robe", "Robe fourreau en velours bordeaux, manches 3/4 et col bateau.", [editorial2, collectionRobe]),
  makeProduct("14", "Robe Midi Imprimé Léopard", "robe-midi-leopard", "22000", "robe", "Robe midi fluide avec imprimé léopard revisité en tons dorés et noirs.", [collectionRobe, editorial1]),

  // ─── Pagnes ───
  makeProduct("15", "Pagne Traditionnel Kita Premium", "pagne-kita-premium", "18000", "pagne", "Pagne kita en coton premium tissé main. 6 yards, couleurs vives garanties.", [collectionPagne, collectionRobe]),
  makeProduct("16", "Pagne Wax Super Deluxe", "pagne-wax-super-deluxe", "15000", "pagne", "Pagne wax hollandais super deluxe. Motifs floraux exclusifs, 6 yards.", [collectionPagne, editorial1], ["6 yards"]),
  makeProduct("17", "Pagne Bazin Riche Brodé Or", "pagne-bazin-brode-or", "25000", "pagne", "Bazin riche getzner brodé avec fils dorés. Qualité supérieure pour grandes occasions.", [collectionPagne, collectionRobe], ["3 yards", "6 yards", "12 yards"]),
  makeProduct("18", "Ensemble 3 Pagnes Assortis", "ensemble-3-pagnes", "35000", "pagne", "Lot de 3 pagnes coordonnés aux motifs complémentaires. Idéal pour créations sur mesure.", [collectionPagne, editorial2], ["Lot 3 pièces"]),
  makeProduct("19", "Pagne Bogolan Authentique", "pagne-bogolan", "20000", "pagne", "Pagne bogolan fait main au Mali. Teintures naturelles, pièce unique.", [collectionPagne, collectionRobe], ["1 pièce"]),

  // ─── Thiouraye ───
  makeProduct("20", "Thiouraye Oud Royal", "thiouraye-oud-royal", "12000", "thiouraye", "Encens premium à base de bois d'oud et de musc. Fragrance envoûtante longue durée.", [thiouraye1, thiouraye2], ["50g", "100g", "200g"]),
  makeProduct("21", "Thiouraye Fleur de Niébé", "thiouraye-fleur-niebe", "8000", "thiouraye", "Mélange traditionnel sénégalais aux notes florales douces et boisées.", [thiouraye2, thiouraye3], ["50g", "100g"]),
  makeProduct("22", "Thiouraye Ambre & Santal", "thiouraye-ambre-santal", "10000", "thiouraye", "Alliance subtile d'ambre chaud et de santal crémeux. Idéal pour la maison.", [thiouraye3, thiouraye4], ["50g", "100g", "200g"]),
  makeProduct("23", "Coffret Découverte 5 Parfums", "coffret-thiouraye-decouverte", "25000", "thiouraye", "Coffret luxe contenant 5 variétés de thiouraye premium en mini formats.", [thiouraye4, thiouraye5], ["Coffret"]),
  makeProduct("24", "Thiouraye Musc Blanc Intense", "thiouraye-musc-blanc", "9000", "thiouraye", "Encens au musc blanc pur. Notes poudrées et enveloppantes.", [thiouraye5, thiouraye1], ["50g", "100g"]),
  makeProduct("25", "Thiouraye Rose du Sahel", "thiouraye-rose-sahel", "11000", "thiouraye", "Fragrance rare à base de rose du Sahel et de bois précieux africains.", [thiouraye1, thiouraye3], ["50g", "100g"]),

  // ─── Bin Bin ───
  makeProduct("26", "Bin Bin Dorées Classiques", "binbin-dorees-classiques", "5000", "binbin", "Perles de taille dorées classiques. Fil élastique résistant à l'eau.", [binBin1, binBin2], ["S (60-70cm)", "M (70-80cm)", "L (80-90cm)", "XL (90-100cm)"]),
  makeProduct("27", "Bin Bin Cristal Multicolore", "binbin-cristal-multicolore", "7000", "binbin", "Perles de cristal multicolores montées sur fil de nylon. Éclat unique.", [binBin2, binBin3], ["S (60-70cm)", "M (70-80cm)", "L (80-90cm)"]),
  makeProduct("28", "Bin Bin Épaisses Rouge Passion", "binbin-epaisses-rouge", "8000", "binbin-epaisses", "Grosses perles rouges avec intercalaires dorés. Style audacieux.", [binBin3, binBin1], ["S (60-70cm)", "M (70-80cm)", "L (80-90cm)", "XL (90-100cm)"]),
  makeProduct("29", "Bin Bin Fins Nacre", "binbin-fins-nacre", "6000", "binbin-fins", "Fines perles nacrées discrètes. Parfaites au quotidien.", [binBin1, binBin3], ["S (60-70cm)", "M (70-80cm)", "L (80-90cm)"]),
  makeProduct("30", "Lot 3 Bin Bin Assortis", "lot-binbin-assorti", "12000", "binbin", "Ensemble de 3 rangs de perles aux couleurs complémentaires.", [binBin2, binBin1], ["S (60-70cm)", "M (70-80cm)", "L (80-90cm)"]),
  makeProduct("31", "Bin Bin Épaisses Turquoise & Or", "binbin-epaisses-turquoise", "9000", "binbin-epaisses", "Grosses perles turquoise avec accent or. Collection été.", [binBin3, binBin2], ["S (60-70cm)", "M (70-80cm)", "L (80-90cm)", "XL (90-100cm)"]),
  makeProduct("32", "Bin Bin Fins Transparents", "binbin-fins-transparents", "4000", "binbin-fins", "Perles transparentes ultra-discrètes. Invisibles sous les vêtements.", [binBin1, binBin2], ["S (60-70cm)", "M (70-80cm)", "L (80-90cm)"]),
  makeProduct("33", "Bin Bin Cauris & Perles Bois", "binbin-cauris-bois", "10000", "binbin", "Authentiques cauris et perles en bois d'ébène. Style ethnique chic.", [binBin2, binBin3], ["S (60-70cm)", "M (70-80cm)", "L (80-90cm)"]),
  makeProduct("34", "Bin Bin Épaisses Noir & Argent", "binbin-epaisses-noir-argent", "8500", "binbin-epaisses", "Perles noires mates avec intercalaires argent. Look sophistiqué.", [binBin3, binBin1], ["S (60-70cm)", "M (70-80cm)", "L (80-90cm)", "XL (90-100cm)"]),
  makeProduct("35", "Bin Bin Personnalisé - Initiales", "binbin-personnalise-initiales", "15000", "binbin", "Bin bin sur mesure avec vos initiales en perles dorées. Commande personnalisée.", [binBin1, binBin2, binBin3], ["S (60-70cm)", "M (70-80cm)", "L (80-90cm)", "XL (90-100cm)"]),
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
