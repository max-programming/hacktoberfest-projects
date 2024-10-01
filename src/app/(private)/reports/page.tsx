import { auth } from '@/auth';
import { getXataClient, ReportsRecord } from '@/xata';
import { notFound } from 'next/navigation';
import { ReportCard } from './_components/report-card';
import { SelectedPick } from '@xata.io/client';
import { Metadata } from 'next';

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

  const client = getXataClient();
  const reports = await client.db.reports
    .sort('xata.createdAt', 'desc')
    .getAll();

  return reports.toSerializable() as unknown as Array<
    SelectedPick<ReportsRecord, ['*']>
  >;
}
