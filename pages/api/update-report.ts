import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from './auth/[...nextauth]';
import { getXataClient } from 'xata';

export default async function updateReport(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'PUT') {
    const allowedEmails = [
      'ui.sabuwala@gmail.com',
      'warriordefenderz@gmail.com'
    ];
    const session = await getServerSession(req, res, authOptions);
    if (!session || !session.user) {
      return res.status(401).json({ message: 'You must be logged in.' });
    }
    if (!allowedEmails.includes(session.user.email!)) {
      return res.status(401).json({ message: 'Invalid user.' });
    }
    const client = getXataClient();
    const reportId = req.query.id as string;
    const report = await client.db.reports.filter({ id: reportId }).getFirst();
    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }

    const updatedReport = await client.db.reports.update(reportId, {
      valid: !report.valid
    });

    return res.send(updatedReport);
  }
}
