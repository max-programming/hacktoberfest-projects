import { auth } from '@/auth';
import { notFound } from 'next/navigation';
import { ReportCard } from './_components/report-card';
import { Metadata } from 'next';
import { reportsTable } from '@/lib/db/migrations/schema';
import { db } from '@/lib/db/connection';
import { desc } from 'drizzle-orm';

export const metadata: Metadata = {
  title: 'Reports'
};

export default async function ReportsPage() {
  const reports = await getReports();

  return (
    <div className="container mx-auto mb-10 mt-5">
      <h2 className="text-3xl text-center">Reports</h2>

      <div className="grid gap-2 place-items-center grid-cols-1">
        {reports.map(report => (
          <ReportCard key={report.id} report={report} />
        ))}
      </div>
    </div>
  );
}

async function getReports() {
  const allowedEmails = ['ui.sabuwala@gmail.com', 'warriordefenderz@gmail.com'];
  const session = await auth();

  if (!session?.user?.email || !allowedEmails.includes(session.user.email)) {
    notFound();
  }

  const reports = await db
    .select()
    .from(reportsTable)
    .orderBy(desc(reportsTable.createdAt))
    .limit(100);

  return reports;
}
