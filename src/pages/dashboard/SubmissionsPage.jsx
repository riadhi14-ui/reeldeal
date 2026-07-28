import React, { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import { useDashboard } from "@/components/dashboard/DashboardLayout";
import SubmissionsList from "@/components/dashboard/SubmissionsList";
import SubmissionsSummary from "@/components/dashboard/SubmissionsSummary";
import SubmitVideoDialog from "@/components/dashboard/SubmitVideoDialog";

export default function SubmissionsPage() {
  const { user, submissions, participations, payments, stats, loadData } = useDashboard();
  const [snapshots, setSnapshots] = useState([]);

  useEffect(() => {
    if (!user?.id) return;
    const load = () => base44.entities.ViewSnapshot.filter({ creator_id: user.id }, "-created_date").then(setSnapshots);
    load();
    const unsubscribe = base44.entities.ViewSnapshot.subscribe(load);
    return unsubscribe;
  }, [user?.id]);

  const snapshotsBySubmission = snapshots.reduce((groups, item) => {
    (groups[item.submission_id] ||= []).push(item);
    return groups;
  }, {});

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-extrabold tracking-tight">Mes soumissions</h1>
        <SubmitVideoDialog participations={participations} onSubmitted={loadData} />
      </div>
      <SubmissionsSummary submissions={submissions} payments={payments} pendingValue={stats.pending} />
      <SubmissionsList submissions={submissions} snapshotsBySubmission={snapshotsBySubmission} />
    </div>
  );
}