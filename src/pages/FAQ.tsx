import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { q: "Quels sont les délais de livraison ?", a: "Les commandes sont expédiées sous 2-3 jours ouvrés. La livraison standard prend 3-5 jours ouvrés en France métropolitaine." },
  { q: "Comment choisir ma taille ?", a: "Consultez notre Guide des Tailles pour trouver la correspondance parfaite. En cas de doute, n'hésitez pas à nous contacter." },
  { q: "Puis-je retourner un article ?", a: "Oui, vous disposez de 14 jours après réception pour effectuer un retour. Les articles doivent être dans leur état d'origine, non portés et avec les étiquettes." },
  { q: "Quels modes de paiement acceptez-vous ?", a: "Nous acceptons les cartes bancaires (Visa, Mastercard, Amex), PayPal et Apple Pay via notre processus de paiement sécurisé." },
  { q: "La livraison est-elle gratuite ?", a: "Oui, la livraison est offerte pour toute commande supérieure à 100€. En dessous, les frais de livraison sont de 5,90€." },
  { q: "Comment entretenir ma lingerie JOFA ?", a: "Nous recommandons un lavage à la main à l'eau froide ou un cycle délicat en machine dans un filet de lavage. Ne pas utiliser de sèche-linge." },
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
