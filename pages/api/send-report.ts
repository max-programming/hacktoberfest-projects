import { XataError } from '@xata.io/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { getXataClient } from 'xata';
import { ZodError, z } from 'zod';

const sendReportSchema = z.object({
  message: z.string().trim().nonempty(),
  repoId: z.number().positive(),
  repoAuthor: z.string().trim().nonempty(),
  userEmail: z.string().trim().email().nonempty()
});

export default async function sendReport(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') return res.status(405).end();
  try {
    const body = sendReportSchema.parse(req.body);
    const client = getXataClient();
    const user = await client.db.nextauth_users
      .filter({ email: body.userEmail })
      .getFirst();

    if (!user) return res.status(400).json({ code: 'USER_NOT_FOUND' });

    const report = await client.db.reports.create({
      message: body.message,
      repoAuthor: body.repoAuthor,
      repoId: body.repoId,
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
