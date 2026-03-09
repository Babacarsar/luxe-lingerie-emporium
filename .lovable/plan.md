

# Architecture SQL complète pour JOFA Lingerie

Voici le schéma de base de données complet pour gérer tout le backend de votre site e-commerce JOFA Lingerie via Supabase.

## Tables principales

### 1. Produits & Catalogue

**`categories`** — Les catégories de produits (Lingerie Sexy, Robes, Pagnes, Thiouraye, Bin Bin...)

**`products`** — Tous les produits avec nom, description, prix, catégorie, statut (actif/inactif), handle pour l'URL

**`product_images`** — Les images associées à chaque produit (URL, ordre d'affichage, texte alternatif)

**`product_variants`** — Les variantes par taille (S, M, L, XL, XXL) avec prix, stock disponible

### 2. Clients & Authentification

**`profiles`** — Profil client lié à `auth.users` (prénom, nom, téléphone, adresse)

**`user_roles`** — Rôles séparés (admin, user) avec fonction `has_role` sécurisée

**`addresses`** — Adresses de livraison multiples par client

### 3. Commandes & Paiements

**`orders`** — Commandes avec statut (en préparation, en transit, livrée), total, mode de paiement

**`order_items`** — Lignes de commande (produit, variante, quantité, prix unitaire)

**`payments`** — Suivi des paiements (Wave, Orange Money, carte, à la livraison)

### 4. Panier

**`cart_items`** — Panier persistant côté serveur (lié au user ou session anonyme)

### 5. Contact & Support

**`contact_messages`** — Messages du formulaire de contact

**`newsletter_subscribers`** — Inscriptions newsletter

### 6. Contenu & Configuration

**`site_settings`** — Paramètres du site (texte bandeau, frais de livraison, seuil livraison gratuite)

**`faqs`** — Questions fréquentes gérées dynamiquement

## Schéma SQL détaillé

```text
┌──────────────┐     ┌──────────────────┐     ┌─────────────────┐
│  categories  │────<│    products       │────<│ product_images  │
│              │     │                  │     └─────────────────┘
└──────────────┘     │                  │────<┌──────────────────┐
                     └──────────────────┘     │ product_variants │
                                              └──────────────────┘
┌──────────────┐     ┌──────────────────┐
│  auth.users  │────<│    profiles      │
│              │────<│    user_roles    │
│              │────<│    addresses     │
└──────────────┘     └──────────────────┘
        │
        └────<┌──────────────┐────<┌──────────────┐
              │   orders     │     │ order_items   │
              │              │────<│              │
              └──────────────┘     └──────────────┘
                     │
                     └────<┌──────────────┐
                           │  payments    │
                           └──────────────┘
```

## Implémentation technique

Chaque table sera créée via des migrations Supabase avec :

- **RLS (Row Level Security)** sur toutes les tables
- Les clients ne voient que leurs propres commandes/adresses/panier
- Les admins gèrent produits, commandes et contenu via `has_role()`
- **Enums** pour les statuts (`order_status`, `payment_method`, `payment_status`, `app_role`)
- **Triggers** pour mettre à jour les totaux de commande et décrémenter le stock
- **Indexes** sur les colonnes de recherche (handle, category_id, user_id)

## Tables SQL (résumé des colonnes clés)

| Table | Colonnes principales |
|-------|---------------------|
| `categories` | id, name, slug, description, image_url, sort_order |
| `products` | id, title, handle, description, category_id, base_price, is_active |
| `product_images` | id, product_id, url, alt_text, position |
| `product_variants` | id, product_id, size, price, stock_quantity, available_for_sale |
| `profiles` | id (= auth.uid), first_name, last_name, phone, avatar_url |
| `user_roles` | id, user_id, role (enum: admin/user) |
| `addresses` | id, user_id, label, full_name, phone, street, city, region, is_default |
| `orders` | id, user_id, order_number, status, subtotal, shipping_fee, total, shipping_address_id, payment_method |
| `order_items` | id, order_id, product_id, variant_id, quantity, unit_price |
| `payments` | id, order_id, method, status, amount, transaction_ref |
| `cart_items` | id, user_id, product_id, variant_id, quantity |
| `contact_messages` | id, name, email, phone, message, is_read |
| `newsletter_subscribers` | id, email, subscribed_at |
| `site_settings` | id, key, value |
| `faqs` | id, question, answer, sort_order, is_active |

## Prochaine étape

Pour implémenter cela, il faudra d'abord **connecter Supabase** au projet, puis créer les migrations pour chaque table avec les politiques RLS appropriées. Cela remplacera progressivement les données mock actuelles (`mockProducts.ts`) par des données dynamiques depuis la base.

