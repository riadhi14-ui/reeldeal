import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';

// Crée une notification in-app à partir d'un évènement de workflow (Message ou Submission).
// Appelée uniquement par les workflows — utilise le rôle service pour écrire l'entité Notification.
export default async function(req) {
  try {
    const base44 = createClientFromRequest(req);
    const body = await req.json().catch(() => ({}));
    const { kind, event_type, data, old_data } = body;

    // Résout la marque propriétaire de la campagne pour lui adresser la notification.
    const resolveBrandOwner = async (campaignId) => {
      if (!campaignId) return null;
      try {
        const campaign = await base44.asServiceRole.entities.Campaign.get(campaignId);
        return campaign?.created_by_id || null;
      } catch {
        return null;
      }
    };

    let notif = null;

    if (kind === "message") {
      // On notifie la marque quand un créateur écrit, sinon le créateur.
      const isFromCreator = (data?.sender || "creator") === "creator";
      const recipientId = isFromCreator
        ? await resolveBrandOwner(data?.campaign_id)
        : (data?.creator_id || null);

      const verb = event_type === "delete" ? "supprimé" : event_type === "update" ? "modifié" : "reçu";
      notif = recipientId && {
        recipient_id: recipientId,
        type: "message",
        title: `Message ${verb}`,
        body: `${data?.creator_name || "Un utilisateur"} — ${data?.campaign_name || "campagne"}: ${(data?.text || "").slice(0, 120)}`,
        link: isFromCreator ? "/brand/messages" : "/dashboard/messages",
      };
    } else if (kind === "submission") {
      const recipientId = await resolveBrandOwner(data?.campaign_id);
      notif = recipientId && {
        recipient_id: recipientId,
        type: "submission",
        title: "Nouvelle soumission vidéo",
        body: `Nouvelle vidéo ${data?.platform ? "(" + data.platform + ") " : ""}pour ${data?.campaign_name || "votre campagne"}`,
        link: "/brand/submissions",
      };
    }

    if (!notif) return Response.json({ ok: true, skipped: true });

    const created = await base44.asServiceRole.entities.Notification.create(notif);
    return Response.json({ ok: true, id: created.id });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}