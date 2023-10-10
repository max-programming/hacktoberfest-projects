import { NextApiRequest, NextApiResponse } from 'next';
import { getXataClient } from 'xata';

export default async function checkRepo(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const repoId = req.query.repoId;
    if (typeof repoId !== 'string') return res.status(400).end();

    const client = getXataClient();

    const repo = await client.db.reports
      .filter({ repoId: Number(repoId) })
      .getFirst();

    return res.send(repo);
  }
}
