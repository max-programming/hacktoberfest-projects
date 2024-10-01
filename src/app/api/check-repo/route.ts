import { auth } from '@/auth';
import { getXataClient } from '@/xata';
import type { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session) return new Response(null, { status: 401 });

  const repoId = req.nextUrl.searchParams.get('repoId');
  if (typeof repoId !== 'string') return new Response(null, { status: 400 });

  const client = getXataClient();
  const repo = await client.db.reports
    .filter({ repoId: Number(repoId) })
    .getFirst();

  return Response.json(repo);
}
