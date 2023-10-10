import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]';
import { ReportsRecord, getXataClient } from 'xata';
import { SelectedPick } from '@xata.io/client';
import { ChangeEvent, useState } from 'react';
import axios from 'axios';

interface ReportsPageProps {
  reports: Readonly<SelectedPick<ReportsRecord, ['*']>>[];
}

export default function ReportsPage({ reports }: ReportsPageProps) {
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

function ReportCard({
  report
}: {
  report: ReportsPageProps['reports'][number];
}) {
  const [isValid, setIsValid] = useState(report.valid);

  async function handleToggleVisibility(e: ChangeEvent<HTMLInputElement>) {
    setIsValid(!isValid);
    const res = await axios.put(`/api/update-report?id=${report.id}`);
    if (res.status !== 200) setIsValid(!isValid);
  }

  return (
    <div className="card w-full bg-base-100 shadow-xl">
      <div className="card-body">
        <a href={report.repoUrl!} className="link card-title" target="_blank">
          {report.repoUrl?.split('github.com/').at(1)}
        </a>
        <p>{report.message}</p>
        <div className="card-actions justify-end">
          {isValid ? 'Valid' : 'Invalid'}
          <input
            type="checkbox"
            className="toggle toggle-warning"
            checked={isValid}
            onChange={handleToggleVisibility}
          />
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<ReportsPageProps>> {
  const allowedEmails = ['ui.sabuwala@gmail.com', 'warriordefenderz@gmail.com'];
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session || !session.user) return { notFound: true };
  if (!allowedEmails.includes(session.user.email!)) return { notFound: true };

  const client = getXataClient();
  const reports = JSON.parse(
    JSON.stringify(
      await client.db.reports.sort('xata.createdAt', 'desc').getAll()
    )
  );

  return {
    props: { reports }
  };
}
