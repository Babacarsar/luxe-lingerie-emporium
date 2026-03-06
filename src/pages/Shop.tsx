import { ProductGrid } from "@/components/ProductGrid";

const Shop = () => (
  <div className="min-h-screen">
    <div className="container pt-10 pb-4">
      <h1 className="font-display text-4xl md:text-5xl text-gold-gradient text-center">Boutique</h1>
      <p className="font-body text-center text-muted-foreground mt-3">
        Découvrez notre collection de lingerie de luxe
      </p>
    </div>
    <ProductGrid limit={40} />
  </div>
);

export default Shop;
