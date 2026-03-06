import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { q: "Quels sont les délais de livraison ?", a: "Les commandes sont expédiées sous 2-3 jours ouvrés. La livraison à Dakar prend 1-2 jours, et 3-5 jours pour les autres régions du Sénégal." },
  { q: "Comment choisir ma taille ?", a: "Consultez notre Guide des Tailles pour trouver la correspondance parfaite. En cas de doute, contactez-nous par WhatsApp ou téléphone." },
  { q: "Puis-je retourner un article ?", a: "Oui, vous disposez de 14 jours après réception pour effectuer un retour. Les articles doivent être dans leur état d'origine, non portés et avec les étiquettes." },
  { q: "Quels modes de paiement acceptez-vous ?", a: "Nous acceptons les paiements par Wave, Orange Money, Free Money, cartes bancaires (Visa, Mastercard) et le paiement à la livraison à Dakar." },
  { q: "La livraison est-elle gratuite ?", a: "Oui, la livraison est offerte à Dakar pour toute commande supérieure à 25 000 FCFA. Pour les autres régions, les frais varient selon la destination." },
  { q: "Comment entretenir ma lingerie JOFA ?", a: "Nous recommandons un lavage à la main à l'eau froide ou un cycle délicat en machine dans un filet de lavage. Ne pas utiliser de sèche-linge." },
  { q: "Livrez-vous en dehors du Sénégal ?", a: "Oui, nous livrons dans toute l'Afrique de l'Ouest (Côte d'Ivoire, Mali, Guinée, etc.). Les délais et frais varient selon le pays." },
];

const FAQ = () => (
  <div className="min-h-screen container py-16 max-w-2xl mx-auto">
    <h1 className="font-display text-4xl md:text-5xl text-gold-gradient text-center mb-10">Questions Fréquentes</h1>

    <Accordion type="single" collapsible className="space-y-2">
      {faqs.map((faq, i) => (
        <AccordionItem key={i} value={`item-${i}`} className="bg-card border border-border rounded-lg px-6">
          <AccordionTrigger className="font-body font-bold text-foreground hover:text-primary">
            {faq.q}
          </AccordionTrigger>
          <AccordionContent className="font-body text-muted-foreground">
            {faq.a}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  </div>
);

export default FAQ;
