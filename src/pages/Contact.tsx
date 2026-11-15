import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Headphones, Mail, MessageCircle, Phone, ShieldAlert, Wrench } from "lucide-react";

/**
 * Coordonnées affichées sur la page Contact.
 * ⚠️ SAV et réclamations : remplacer par les vrais numéros / e-mails dès que la cliente les donne.
 */
const CONTACTS = [
  {
    key: "client",
    icon: Headphones,
    title: "Service client",
    text: "Questions, conseils taille, commandes",
    phone: "+221 77 663 93 91",
    email: "contact@jofa-lingerie.com",
  },
  {
    key: "sav",
    icon: Wrench,
    title: "SAV",
    text: "Échange, retour, problème de taille après réception",
    phone: "+221 77 663 93 91",
    email: "sav@jofa-lingerie.com",
  },
  {
    key: "reclamation",
    icon: ShieldAlert,
    title: "Réclamations",
    text: "Article abîmé, erreur de commande, retard de livraison",
    phone: "+221 77 663 93 91",
    email: "reclamations@jofa-lingerie.com",
  },
] as const;

const SUBJECTS = ["Question", "SAV", "Réclamation"] as const;

const whatsappLink = (phone: string, text: string) =>
  `https://wa.me/${phone.replace(/\D/g, "")}?text=${encodeURIComponent(text)}`;

const Contact = () => {
  const [name, setName] = useState("");
  const [subject, setSubject] = useState<(typeof SUBJECTS)[number]>("Question");
  const [orderNumber, setOrderNumber] = useState("");
  const [message, setMessage] = useState("");

  // Le formulaire ouvre WhatsApp avec le message déjà rédigé, vers le bon service.
  const submit = (e: FormEvent) => {
    e.preventDefault();
    const target = subject === "SAV" ? CONTACTS[1] : subject === "Réclamation" ? CONTACTS[2] : CONTACTS[0];
    const text = [
      `[${subject}]`,
      name && `Nom : ${name}`,
      orderNumber && `Commande : ${orderNumber}`,
      message,
    ].filter(Boolean).join("\n");
    window.open(whatsappLink(target.phone, text), "_blank", "noopener");
  };

  return (
    <div className="min-h-screen container py-16 max-w-5xl mx-auto">
      <h1 className="font-display text-4xl md:text-5xl text-gold-gradient text-center mb-4">Contact</h1>
      <p className="font-body text-muted-foreground leading-relaxed text-center max-w-2xl mx-auto mb-12">
        Une question, une demande particulière, un souci avec une commande ? Notre équipe vous répond rapidement.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-14">
        {CONTACTS.map((c) => (
          <div key={c.key} className="rounded-xl border border-border bg-card p-6 space-y-4">
            <div>
              <c.icon className="w-6 h-6 text-primary mb-3" />
              <h2 className="font-display text-xl">{c.title}</h2>
              <p className="font-body text-xs text-muted-foreground mt-1">{c.text}</p>
            </div>
            <div className="space-y-2 font-body text-sm">
              <a href={`tel:${c.phone.replace(/\s/g, "")}`} className="flex items-center gap-2 text-muted-foreground hover:text-primary">
                <Phone className="w-4 h-4 text-primary" /> {c.phone}
              </a>
              <a href={`mailto:${c.email}`} className="flex items-center gap-2 text-muted-foreground hover:text-primary break-all">
                <Mail className="w-4 h-4 text-primary flex-shrink-0" /> {c.email}
              </a>
            </div>
            <a
              href={whatsappLink(c.phone, `Bonjour JOFA, je vous contacte pour : ${c.title}`)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded bg-[#25D366] px-4 py-2 text-xs font-body font-bold uppercase tracking-wider text-white hover:bg-[#1ebe5b] transition-colors"
            >
              <MessageCircle className="w-4 h-4" /> WhatsApp
            </a>
          </div>
        ))}
      </div>

      <form className="max-w-2xl mx-auto space-y-4 rounded-xl border border-border bg-card p-6" onSubmit={submit}>
        <h2 className="font-display text-2xl mb-2">Écrivez-nous</h2>
        <div className="flex flex-wrap gap-2">
          {SUBJECTS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSubject(s)}
              className={`px-4 py-2 text-sm font-body rounded border transition-colors ${
                subject === s ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:border-primary/50"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
        <Input placeholder="Nom complet" value={name} onChange={(e) => setName(e.target.value)} className="bg-secondary border-border" />
        {subject !== "Question" && (
          <Input placeholder="Numéro de commande" value={orderNumber} onChange={(e) => setOrderNumber(e.target.value)} className="bg-secondary border-border" />
        )}
        <Textarea placeholder="Votre message..." required value={message} onChange={(e) => setMessage(e.target.value)} className="bg-secondary border-border min-h-[120px]" />
        <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-body uppercase tracking-widest">
          Envoyer via WhatsApp
        </Button>
      </form>
    </div>
  );
};

export default Contact;
