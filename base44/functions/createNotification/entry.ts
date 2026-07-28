import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';

// Crée une notification in-app à partir d'un évènement de workflow (Message ou Submission).
// Sécurité : aucun contenu fourni par l'appelant n'est stocké. Tout est relu depuis la base
// (Message / Submission / Campaign) à partir du seul identifiant d'enregistrement, donc un
// appel forgé ne peut pas injecter de faux texte ni cibler un destinataire arbitraire.
export default async function(req) {
  try {
    const base44 = createClientFromRequest(req);
    const body = await req.json().catch(() => ({}));
    const kind = body?.kind;
    const eventType = body?.event_type;
    const recordId = typeof body?.record_id === "string" ? body.record_id : null;
    const campaignId = typeof body?.campaign_id === "string" ? body.campaign_id : null;

    const getCampaign = async (id) => {
      if (!id) return null;
      try {
        return await base44.asServiceRole.entities.Campaign.get(id);
      } catch {
        return null;
      }
    };

    let notif = null;

    if (kind === "message") {
      let record = null;
      if (recordId) {
        record = await base44.asServiceRole.entities.Message.get(recordId).catch(() => null);
      }

      if (record) {
        const isFromCreator = (record.sender || "creator") === "creator";
        const campaign = await getCampaign(record.campaign_id);
        const recipientId = isFromCreator ? campaign?.created_by_id : record.creator_id;
        if (recipientId) {
          notif = {
            recipient_id: recipientId,
            type: "message",
            title: eventType === "update" ? "Message modifié" : "Message reçu",
            body: `${record.creator_name || "Un utilisateur"} — ${campaign?.name || "campagne"}: ${(record.text || "").slice(0, 120)}`,
            link: isFromCreator ? "/brand/messages" : "/dashboard/messages",
          };
        }
      } else if (eventType === "delete" && campaignId) {
        // L'enregistrement n'existe plus : on n'utilise que des données vérifiées en base.
        const campaign = await getCampaign(campaignId);
        if (campaign?.created_by_id) {
          notif = {
            recipient_id: campaign.created_by_id,
            type: "message",
            title: "Message supprimé",
            body: `Un message a été supprimé — ${campaign.name || "campagne"}`,
            link: "/brand/messages",
          };
        }
      }
    } else if (kind === "submission" && recordId) {
      const record = await base44.asServiceRole.entities.Submission.get(recordId).catch(() => null);
      if (record) {
        const campaign = await getCampaign(record.campaign_id);
        if (campaign?.created_by_id) {
          notif = {
            recipient_id: campaign.created_by_id,
            type: "submission",
            title: "Nouvelle soumission vidéo",
            body: `Nouvelle vidéo ${record.platform ? "(" + record.platform + ") " : ""}pour ${campaign.name || "votre campagne"}`,
            link: "/brand/submissions",
          };
        }
      }
    }

    if (!notif) return Response.json({ ok: true, skipped: true });

    const created = await base44.asServiceRole.entities.Notification.create(notif);
    return Response.json({ ok: true, id: created.id });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}