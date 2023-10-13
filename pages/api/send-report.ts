import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { getXataClient } from 'xata';
import { ZodError, z } from 'zod';
import { authOptions } from './auth/[...nextauth]';

const sendReportSchema = z.object({
  message: z.string().trim().nonempty(),
  repoId: z.number().positive(),
  repoAuthor: z.string().trim().nonempty(),
  repoUrl: z.string().trim().nonempty()
});

export default async function sendReport(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') return res.status(405).end();
  try {
    const body = sendReportSchema.parse(req.body);
    const session = await getServerSession(req, res, authOptions);

    if (!session) {
      return res.status(401).json({ message: 'You must be logged in.' });
    }

    const client = getXataClient();
    const user = await client.db.nextauth_users
      .filter({ email: session.user?.email })
      .getFirst();

    if (!user) return res.status(400).json({ code: 'USER_NOT_FOUND' });

    const report = await client.db.reports.create({
      message: body.message,
      repoAuthor: body.repoAuthor,
      repoId: body.repoId,
      repoUrl: body.repoUrl,
      user: { id: user.id }
    });

    res.send(report);
  } catch (e) {
    if (e instanceof ZodError) {
      return res.status(400).json({ code: 'INVALID_BODY', details: e.issues });
    }
    if ((e as any).status === 400) {
      return res.status(409).json({ message: 'Repository already reported' });
    }
  }
}

export type SendReportSchema = z.infer<typeof sendReportSchema>;
