import { toast } from "sonner";
import { useCartStore, type CartItem } from "@/stores/cartStore";

interface Variant {
  node: {
    id: string;
    title: string;
    price: { amount: string; currencyCode: string };
    selectedOptions?: Array<{ name: string; value: string }>;
  };
}

/** Permet de changer la taille / le grammage d'un article directement depuis le panier. */
export const CartSizeSelect = ({ item, compact = false }: { item: CartItem; compact?: boolean }) => {
  const changeVariant = useCartStore((s) => s.changeVariant);
  const variants: Variant[] = item.product?.node?.variants?.edges ?? [];
  const optionName = item.selectedOptions[0]?.name ?? "Taille";

  if (variants.length < 2) {
    return <p className="text-xs text-muted-foreground font-body mt-1">{item.selectedOptions.map((o) => o.value).join(" • ")}</p>;
  }

  return (
    <label className={`flex items-center gap-2 font-body ${compact ? "mt-1 text-xs" : "mt-2 text-sm"}`}>
      <span className="text-muted-foreground">{optionName} :</span>
      <select
        value={item.variantId}
        onChange={(e) => {
          const v = variants.find((x) => x.node.id === e.target.value);
          if (!v) return;
          changeVariant(item.variantId, {
            variantId: v.node.id,
            variantTitle: v.node.title,
            price: v.node.price,
            selectedOptions: v.node.selectedOptions ?? [{ name: optionName, value: v.node.title }],
          });
          toast.success(`${optionName} mise à jour : ${v.node.title}`, { position: "top-center" });
        }}
        className="rounded border border-border bg-secondary px-2 py-1 text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
      >
        {variants.map((v) => (
          <option key={v.node.id} value={v.node.id}>
            {v.node.title}
          </option>
        ))}
      </select>
    </label>
  );
};
