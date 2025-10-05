import { auth } from '@/auth';
import { db } from '@/lib/db/connection';
import { reportsTable } from '@/lib/db/migrations/schema';
import type { NextRequest } from 'next/server';
import { eq } from 'drizzle-orm';

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session) return new Response(null, { status: 401 });

  const repoId = req.nextUrl.searchParams.get('repoId');
  if (typeof repoId !== 'string') return new Response(null, { status: 400 });

  const repo = await db
    .select()
    .from(reportsTable)
    .where(eq(reportsTable.repoId, parseInt(repoId)))
    .limit(1);

  return Response.json(repo);
}
