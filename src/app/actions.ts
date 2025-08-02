'use server';

import { auth, signIn, signOut } from '@/auth';
import { sendReportSchema, SendReportSchema } from './validation';
import { getXataClient } from '@/xata';
import { z } from 'zod';

const client = getXataClient();

export async function signInAction() {
  await signIn('github');
}

export async function signOutAction() {
  await signOut();
}

export async function sendReportAction(data: SendReportSchema) {
  const session = await auth();
  if (!session || !session.user) throw new Error('You must be logged in.');
  const { success, data: body, error } = sendReportSchema.safeParse(data);

  if (!success) return z.treeifyError(error);

  const user = await client.db.nextauth_users
    .filter({ email: session.user.email })
    .getFirst();

  if (!user) throw new Error('User not found');

  const report = await client.db.reports.create({
    message: body.message,
    repoAuthor: body.repoAuthor,
    repoId: body.repoId,
    repoUrl: body.repoUrl,
    user: { id: user.id }
  });

  return report.toSerializable();
}

export async function updateReportAction(reportId: string) {
  const allowedEmails = ['ui.sabuwala@gmail.com', 'warriordefenderz@gmail.com'];
  const session = await auth();

  if (!session?.user?.email || !allowedEmails.includes(session.user.email)) {
    throw new Error('Invalid user');
  }

  const report = await client.db.reports.filter({ id: reportId }).getFirst();
  if (!report) throw new Error('Report not found');

  const updatedReport = await client.db.reports.update(reportId, {
    valid: !report.valid
  });

  return updatedReport?.toSerializable();
}
