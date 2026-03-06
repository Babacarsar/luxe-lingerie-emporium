import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone } from "lucide-react";

const Contact = () => (
  <div className="min-h-screen container py-16 max-w-4xl mx-auto">
    <h1 className="font-display text-4xl md:text-5xl text-gold-gradient text-center mb-10">Contact</h1>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      {/* Info */}
      <div className="space-y-8">
        <p className="font-body text-muted-foreground leading-relaxed">
          Une question, une demande particulière ? Notre équipe est à votre disposition pour vous accompagner.
        </p>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-primary" />
            <span className="font-body text-muted-foreground">contact@jofa-lingerie.com</span>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="w-5 h-5 text-primary" />
            <span className="font-body text-muted-foreground">+221 77 123 45 67</span>
          </div>
          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-primary" />
            <span className="font-body text-muted-foreground">Paris, France</span>
          </div>
        </div>
      </div>

      {/* Form */}
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <Input placeholder="Nom complet" className="bg-secondary border-border" />
        <Input type="email" placeholder="Email" className="bg-secondary border-border" />
        <Input placeholder="Sujet" className="bg-secondary border-border" />
        <Textarea placeholder="Votre message..." className="bg-secondary border-border min-h-[120px]" />
        <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-body uppercase tracking-widest">
          Envoyer
        </Button>
      </form>
    </div>
  </div>
);

export default Contact;
