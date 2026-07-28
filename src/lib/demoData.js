// Données fictives utilisées uniquement pour le "Mode démo" du créateur.
// Aucune de ces valeurs n'est jamais écrite en base de données — c'est une
// simple surcouche visuelle pour montrer à quoi ressemble un compte actif.
//
// Les chiffres sont dérivés de l'identifiant du créateur afin que chaque
// compte voie des valeurs différentes (mais stables d'une session à l'autre).

// Générateur pseudo-aléatoire déterministe basé sur un seed textuel (l'ID).
function makeRng(seed = "") {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return () => {
    h += 0x6d2b79f5;
    let t = h;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function getDemoData(seed = "") {
  const rng = makeRng(seed);
  const between = (min, max) => min + rng() * (max - min);

  const earned = Math.round(between(600, 1500) / 10) * 10 + 0.5;
  const withdrawn = Math.round((earned * between(0.35, 0.6)) / 10) * 10;
  const withdrawalPending = Math.round(between(0, 150) / 10) * 10;
  const pending = Math.round(between(40, 160) / 10) * 10;
  const available = Math.max(Math.round(earned - withdrawn - withdrawalPending), 0) + 0.5;

  const stats = {
    total: earned,
    earned,
    withdrawn,
    available,
    withdrawalPending,
    pending,
    views: Math.round(between(120, 900)) * 1000,
    videos: Math.round(between(8, 40)),
  };

  const months = ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin"];
  let acc = Math.round(between(80, 200));
  const chart = months.map((label) => {
    acc = Math.min(acc + Math.round(between(80, 250)), 1500);
    return { label, value: acc };
  });

  const daysAgo = (n) => new Date(Date.now() - n * 24 * 60 * 60 * 1000).toISOString();
  const withdrawals = [
    { id: "demo-w1", created_date: daysAgo(3), method: "Virement Bancaire", destination: "FR7630001007941234567890185", status: "completed", amount: Math.round(between(200, 700) / 10) * 10 },
    { id: "demo-w2", created_date: daysAgo(12), method: "PayPal", destination: "creator@email.com", status: "completed", amount: Math.round(between(150, 500) / 10) * 10 },
    { id: "demo-w3", created_date: daysAgo(18), method: "Wise", destination: "FR7612345678901234567890123", status: "pending", amount: Math.round(between(80, 300) / 10) * 10 },
    { id: "demo-w4", created_date: daysAgo(31), method: "Virement Bancaire", destination: "FR7630001007941234567890185", status: "completed", amount: Math.round(between(150, 600) / 10) * 10 },
  ];

  return { stats, chart, withdrawals };
}