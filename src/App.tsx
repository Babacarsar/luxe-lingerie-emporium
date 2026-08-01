import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useCartSync } from "@/hooks/useCartSync";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import Index from "./pages/Index";
import Shop from "./pages/Shop";
import Collections from "./pages/Collections";
import CollectionDetail from "./pages/CollectionDetail";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import OrderTracking from "./pages/OrderTracking";
import OrderHistory from "./pages/OrderHistory";
import About from "./pages/About";
import SizeGuide from "./pages/SizeGuide";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppLayout = () => {
  useCartSync();
  return (
    <>
      {/* Layout */}
      <Header />
      <main className="min-h-screen pt-16 md:pt-20">
        <Routes>
          <Route path="/" element={<div className="-mt-16 md:-mt-20"><Index /></div>} />
          <Route path="/boutique" element={<Shop />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/collections/:handle" element={<CollectionDetail />} />
          <Route path="/product/:handle" element={<ProductDetail />} />
          <Route path="/panier" element={<Cart />} />
          <Route path="/suivi-commande" element={<OrderTracking />} />
          <Route path="/mes-commandes" element={<OrderHistory />} />
          <Route path="/a-propos" element={<About />} />
          <Route path="/guide-des-tailles" element={<SizeGuide />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />

        </Routes>
      </main>
      <Footer />
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppLayout />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
