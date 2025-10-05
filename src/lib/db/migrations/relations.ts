import { relations } from 'drizzle-orm/relations';
import {
  usersTable,
  accountsTable,
  nextauthSessions,
  nextauthUsersAccounts,
  nextauthUsersSessions,
  bookmarks,
  reports
} from './schema';

export const nextauthAccountsRelations = relations(
  accountsTable,
  ({ one, many }) => ({
    nextauthUser: one(usersTable, {
      fields: [accountsTable.userId],
      references: [usersTable.id]
    }),
    nextauthUsersAccounts: many(nextauthUsersAccounts)
  })
);

export const nextauthUsersRelations = relations(usersTable, ({ many }) => ({
  nextauthAccounts: many(accountsTable),
  nextauthSessions: many(nextauthSessions),
  nextauthUsersAccounts: many(nextauthUsersAccounts),
  nextauthUsersSessions: many(nextauthUsersSessions),
  bookmarks: many(bookmarks),
  reports: many(reports)
}));

export const nextauthSessionsRelations = relations(
  nextauthSessions,
  ({ one, many }) => ({
    nextauthUser: one(usersTable, {
      fields: [nextauthSessions.userId],
      references: [usersTable.id]
    }),
    nextauthUsersSessions: many(nextauthUsersSessions)
  })
);

export const nextauthUsersAccountsRelations = relations(
  nextauthUsersAccounts,
  ({ one }) => ({
    nextauthUser: one(usersTable, {
      fields: [nextauthUsersAccounts.userId],
      references: [usersTable.id]
    }),
    nextauthAccount: one(accountsTable, {
      fields: [nextauthUsersAccounts.accountId],
      references: [accountsTable.id]
    })
  })
);

export const nextauthUsersSessionsRelations = relations(
  nextauthUsersSessions,
  ({ one }) => ({
    nextauthUser: one(usersTable, {
      fields: [nextauthUsersSessions.userId],
      references: [usersTable.id]
    }),
    nextauthSession: one(nextauthSessions, {
      fields: [nextauthUsersSessions.sessionId],
      references: [nextauthSessions.id]
    })
  })
);

export const bookmarksRelations = relations(bookmarks, ({ one }) => ({
  nextauthUser: one(usersTable, {
    fields: [bookmarks.userId],
    references: [usersTable.id]
  })
}));

export const reportsRelations = relations(reports, ({ one }) => ({
  nextauthUser: one(usersTable, {
    fields: [reports.userId],
    references: [usersTable.id]
  })
}));
