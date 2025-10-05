'use server';

import { auth, signIn, signOut } from '@/auth';
import { sendReportSchema, SendReportSchema } from './validation';
import { db } from '@/lib/db/connection';
import { z } from 'zod';
import { eq } from 'drizzle-orm';
import { reportsTable, usersTable } from '@/lib/db/migrations/schema';

export async function signInAction() {
  await signIn('github');
}

export async function signOutAction() {
  await signOut();
}

export async function sendReportAction(data: SendReportSchema) {
  const session = await auth();
  if (!session || !session.user || !session.user.email)
    throw new Error('You must be logged in.');
  const { success, data: body, error } = sendReportSchema.safeParse(data);

  if (!success) return z.treeifyError(error);

  const [user] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, session.user.email))
    .limit(1);

  if (!user) throw new Error('User not found');

  const [report] = await db
    .insert(reportsTable)
    .values({
      id: crypto.randomUUID(),
      message: body.message,
      repoAuthor: body.repoAuthor,
      repoId: body.repoId,
      repoUrl: body.repoUrl,
      userId: user.id
    })
    .returning();

  return report;
}

export async function updateReportAction(reportId: string) {
  const allowedEmails = ['ui.sabuwala@gmail.com', 'warriordefenderz@gmail.com'];
  const session = await auth();

  if (!session?.user?.email || !allowedEmails.includes(session.user.email)) {
    throw new Error('Invalid user');
  }

  const [report] = await db
    .select()
    .from(reportsTable)
    .where(eq(reportsTable.id, reportId))
    .limit(1);
  if (!report) throw new Error('Report not found');

  const [updatedReport] = await db
    .update(reportsTable)
    .set({
      valid: !report.valid
    })
    .where(eq(reportsTable.id, reportId))
    .returning();

  return updatedReport;
}
