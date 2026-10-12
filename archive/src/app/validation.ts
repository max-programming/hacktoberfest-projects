import { z } from 'zod';

export const sendReportSchema = z.object({
  message: z.string().trim().min(1, 'Message must not be empty'),
  repoId: z.number().positive(),
  repoAuthor: z.string().trim().min(1, 'Repo author must not be empty'),
  repoUrl: z.string().url().trim().min(1, 'Repo URL must not be empty')
});
export type SendReportSchema = z.infer<typeof sendReportSchema>;
