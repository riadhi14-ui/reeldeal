import { base44 } from "@/api/base44Client";

export async function updateSubmissionViews(submission, views, rate) {
  const previousViews = submission.views || 0;
  await base44.entities.Submission.update(submission.id, {
    views,
    earnings: Math.round((views / 1000) * rate * 100) / 100,
  });
  await base44.entities.ViewSnapshot.create({
    submission_id: submission.id,
    campaign_id: submission.campaign_id,
    creator_id: submission.created_by_id,
    brand_id: submission.brand_id,
    views,
    previous_views: previousViews,
    delta: views - previousViews,
  });
}