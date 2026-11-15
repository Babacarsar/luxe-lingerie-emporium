import { Reviews } from "@/components/Reviews";

const ReviewsPage = () => (
  <div className="min-h-screen container py-16">
    <p className="font-body text-muted-foreground mb-10 max-w-2xl">
      Vos retours comptent pour nous. Partagez votre expérience JOFA : qualité, taille, livraison…
    </p>
    <Reviews title="Avis clients" limit={60} />
  </div>
);

export default ReviewsPage;
