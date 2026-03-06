const sizes = [
  { fr: "85A", eu: "70A", uk: "32A", us: "32A", tour: "83-87", bonnet: "A" },
  { fr: "85B", eu: "70B", uk: "32B", us: "32B", tour: "83-87", bonnet: "B" },
  { fr: "90B", eu: "75B", uk: "34B", us: "34B", tour: "88-92", bonnet: "B" },
  { fr: "90C", eu: "75C", uk: "34C", us: "34C", tour: "88-92", bonnet: "C" },
  { fr: "95B", eu: "80B", uk: "36B", us: "36B", tour: "93-97", bonnet: "B" },
  { fr: "95C", eu: "80C", uk: "36C", us: "36C", tour: "93-97", bonnet: "C" },
  { fr: "95D", eu: "80D", uk: "36D", us: "36D", tour: "93-97", bonnet: "D" },
  { fr: "100C", eu: "85C", uk: "38C", us: "38C", tour: "98-102", bonnet: "C" },
  { fr: "100D", eu: "85D", uk: "38D", us: "38D", tour: "98-102", bonnet: "D" },
];

const SizeGuide = () => (
  <div className="min-h-screen container py-16 max-w-4xl mx-auto">
    <h1 className="font-display text-4xl md:text-5xl text-gold-gradient text-center mb-4">Guide des Tailles</h1>
    <p className="font-body text-center text-muted-foreground mb-10">Trouvez votre taille parfaite</p>

    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm font-body">
          <thead>
            <tr className="border-b border-border bg-secondary/50">
              <th className="px-4 py-3 text-left text-primary font-bold">FR</th>
              <th className="px-4 py-3 text-left text-primary font-bold">EU</th>
              <th className="px-4 py-3 text-left text-primary font-bold">UK</th>
              <th className="px-4 py-3 text-left text-primary font-bold">US</th>
              <th className="px-4 py-3 text-left text-primary font-bold">Tour de poitrine (cm)</th>
              <th className="px-4 py-3 text-left text-primary font-bold">Bonnet</th>
            </tr>
          </thead>
          <tbody>
            {sizes.map((s, i) => (
              <tr key={i} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                <td className="px-4 py-3 text-foreground">{s.fr}</td>
                <td className="px-4 py-3 text-muted-foreground">{s.eu}</td>
                <td className="px-4 py-3 text-muted-foreground">{s.uk}</td>
                <td className="px-4 py-3 text-muted-foreground">{s.us}</td>
                <td className="px-4 py-3 text-muted-foreground">{s.tour}</td>
                <td className="px-4 py-3 text-muted-foreground">{s.bonnet}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

    <div className="mt-10 bg-card border border-border rounded-lg p-8">
      <h2 className="font-display text-xl mb-4">Comment prendre vos mesures ?</h2>
      <ol className="font-body text-muted-foreground space-y-3 list-decimal list-inside">
        <li>Munissez-vous d'un mètre-ruban souple.</li>
        <li><strong className="text-foreground">Tour de poitrine :</strong> Mesurez horizontalement à l'endroit le plus fort de votre poitrine.</li>
        <li><strong className="text-foreground">Tour de dessous de poitrine :</strong> Mesurez juste sous la poitrine, bien à l'horizontale.</li>
        <li>Référez-vous au tableau ci-dessus pour trouver votre taille.</li>
      </ol>
    </div>
  </div>
);

export default SizeGuide;
