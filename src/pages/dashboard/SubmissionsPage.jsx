import React from "react";
import { useDashboard } from "@/components/dashboard/DashboardLayout";
import SubmissionsList from "@/components/dashboard/SubmissionsList";
import SubmissionsSummary from "@/components/dashboard/SubmissionsSummary";
import SubmitVideoDialog from "@/components/dashboard/SubmitVideoDialog";

export default function SubmissionsPage() {
  const { submissions, participations, payments, stats, loadData } = useDashboard();
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-extrabold tracking-tight">Mes soumissions</h1>
        <SubmitVideoDialog participations={participations} onSubmitted={loadData} />
      </div>
      <SubmissionsSummary submissions={submissions} payments={payments} pendingValue={stats.pending} />
      <SubmissionsList submissions={submissions} />
    </div>
  );
}