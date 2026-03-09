

# Architecture SQL complète — JOFA Lingerie

Voici le schéma SQL complet à titre de référence/documentation. Aucune modification ne sera apportée au projet.

---

## Enums

```sql
CREATE TYPE public.app_role AS ENUM ('admin', 'user');
CREATE TYPE public.order_status AS ENUM ('pending', 'confirmed', 'preparing', 'shipped', 'delivered', 'cancelled');
CREATE TYPE public.payment_method AS ENUM ('wave', 'orange_money', 'free_money', 'card', 'cash_on_delivery');
CREATE TYPE public.payment_status AS ENUM ('pending', 'completed', 'failed', 'refunded');
```

## 1. Catalogue

```sql
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  image_url TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  handle TEXT UNIQUE NOT NULL,
  description TEXT,
  category_id UUID REFERENCES categories(id),
  base_price NUMERIC(10,2) NOT NULL,
  compare_at_price NUMERIC(10,2),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE product_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE NOT NULL,
  url TEXT NOT NULL,
  alt_text TEXT,
  position INT DEFAULT 0
);

CREATE TABLE product_variants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE NOT NULL,
  size TEXT NOT NULL,
  price NUMERIC(10,2) NOT NULL,
  stock_quantity INT DEFAULT 0,
  sku TEXT,
  available_for_sale BOOLEAN DEFAULT true
);
```

## 2. Utilisateurs

```sql
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name TEXT,
  last_name TEXT,
  phone TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);

CREATE TABLE addresses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  label TEXT DEFAULT 'Domicile',
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  street TEXT NOT NULL,
  city TEXT NOT NULL,
  region TEXT,
  country TEXT DEFAULT 'Sénégal',
  is_default BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

## 3. Commandes & Paiements

```sql
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  order_number TEXT UNIQUE NOT NULL,
  status order_status DEFAULT 'pending',
  subtotal NUMERIC(10,2) NOT NULL,
  shipping_fee NUMERIC(10,2) DEFAULT 0,
  total NUMERIC(10,2) NOT NULL,
  shipping_address_id UUID REFERENCES addresses(id),
  payment_method payment_method,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE NOT NULL,
  product_id UUID REFERENCES products(id),
  variant_id UUID REFERENCES product_variants(id),
  product_title TEXT NOT NULL,
  variant_title TEXT,
  quantity INT NOT NULL,
  unit_price NUMERIC(10,2) NOT NULL
);

CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE NOT NULL,
  method payment_method NOT NULL,
  status payment_status DEFAULT 'pending',
  amount NUMERIC(10,2) NOT NULL,
  transaction_ref TEXT,
  paid_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

## 4. Panier persistant

```sql
CREATE TABLE cart_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE NOT NULL,
  variant_id UUID REFERENCES product_variants(id) ON DELETE CASCADE NOT NULL,
  quantity INT DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

## 5. Support & Contenu

```sql
CREATE TABLE contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  subscribed_at TIMESTAMPTZ DEFAULT now(),
  is_active BOOLEAN DEFAULT true
);

CREATE TABLE site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  value TEXT,
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE faqs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  sort_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

## 6. Fonction de rôle sécurisée

```sql
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;
```

## 7. Trigger — numéro de commande automatique

```sql
CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.order_number := 'JOFA-' || TO_CHAR(now(), 'YYYYMMDD') || '-' || LPAD(nextval('order_number_seq')::TEXT, 4, '0');
  RETURN NEW;
END;
$$;

CREATE SEQUENCE order_number_seq START 1;
CREATE TRIGGER set_order_number BEFORE INSERT ON orders
  FOR EACH ROW EXECUTE FUNCTION generate_order_number();
```

## 8. Trigger — mise à jour du stock

```sql
CREATE OR REPLACE FUNCTION decrement_stock()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  UPDATE product_variants
  SET stock_quantity = stock_quantity - NEW.quantity
  WHERE id = NEW.variant_id;
  RETURN NEW;
END;
$$;

CREATE TRIGGER after_order_item_insert AFTER INSERT ON order_items
  FOR EACH ROW EXECUTE FUNCTION decrement_stock();
```

---

Ce document sert de référence. Quand vous voudrez implémenter ces tables dans la base, il suffira de me le dire.

