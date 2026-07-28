// Données fictives utilisées uniquement pour le "Mode démo" du créateur.
// Aucune de ces valeurs n'est jamais écrite en base de données — c'est une
// simple surcouche visuelle pour montrer à quoi ressemble un compte actif.

export const DEMO_STATS = {
  total: 4820.5,
  earned: 4820.5,
  withdrawn: 3100,
  available: 1420.5,
  withdrawalPending: 300,
  pending: 180,
  views: 1284000,
  videos: 42,
};

export const DEMO_CHART = [
  { label: "Jan", value: 340 },
  { label: "Fév", value: 610 },
  { label: "Mar", value: 880 },
  { label: "Avr", value: 1250 },
  { label: "Mai", value: 1740 },
  { label: "Juin", value: 2200 },
];

const daysAgo = (n) => new Date(Date.now() - n * 24 * 60 * 60 * 1000).toISOString();

export const DEMO_WITHDRAWALS = [
  { id: "demo-w1", created_date: daysAgo(3), method: "Virement Bancaire", destination: "FR7630001007941234567890185", status: "completed", amount: 1200 },
  { id: "demo-w2", created_date: daysAgo(12), method: "PayPal", destination: "creator@email.com", status: "completed", amount: 900 },
  { id: "demo-w3", created_date: daysAgo(18), method: "Wise", destination: "FR7612345678901234567890123", status: "pending", amount: 300 },
  { id: "demo-w4", created_date: daysAgo(31), method: "Virement Bancaire", destination: "FR7630001007941234567890185", status: "completed", amount: 1000 },
];