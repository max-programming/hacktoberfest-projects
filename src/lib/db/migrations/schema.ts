import {
  pgTable,
  text,
  varchar,
  timestamp,
  integer,
  boolean,
  primaryKey
} from 'drizzle-orm/pg-core';
import type { AdapterAccountType } from '@auth/core/adapters';

export const usersTable = pgTable('nextauth_users', {
  id: text()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID())
    .notNull(),
  email: varchar({ length: 255 }),
  emailVerified: timestamp({ mode: 'date' }),
  name: varchar({ length: 255 }),
  image: varchar({ length: 255 }),
  createdAt: timestamp('createdAt', {
    withTimezone: true,
    mode: 'date'
  }).defaultNow(),
  updatedAt: timestamp('updatedAt', {
    withTimezone: true,
    mode: 'date'
  })
    .defaultNow()
    .$onUpdate(() => new Date())
});

export const accountsTable = pgTable(
  'nextauth_accounts',
  {
    userId: text('userId')
      .notNull()
      .references(() => usersTable.id, { onDelete: 'cascade' }),
    type: varchar({ length: 100 }).$type<AdapterAccountType>().notNull(),
    provider: varchar({ length: 100 }).notNull(),
    providerAccountId: varchar({ length: 255 }).notNull(),
    refresh_token: varchar('refresh_token', { length: 255 }),
    access_token: varchar('access_token', { length: 255 }),
    expires_at: integer('expires_at'),
    token_type: varchar('token_type', { length: 100 }),
    scope: varchar({ length: 255 }),
    id_token: text('id_token'),
    session_state: varchar('session_state', { length: 255 }),
    createdAt: timestamp('createdAt', {
      withTimezone: true,
      mode: 'date'
    }).defaultNow(),
    updatedAt: timestamp('updatedAt', {
      withTimezone: true,
      mode: 'date'
    })
      .defaultNow()
      .$onUpdate(() => new Date())
  },
  table => [
    {
      compoundKey: primaryKey({
        columns: [table.provider, table.providerAccountId]
      })
    }
  ]
);

export const verificationTokensTable = pgTable(
  'nextauth_verificationtokens',
  {
    identifier: varchar({ length: 255 }).notNull(),
    token: varchar({ length: 255 }).notNull(),
    expires: timestamp({ mode: 'date' }).notNull(),
    createdAt: timestamp('createdAt', {
      withTimezone: true,
      mode: 'date'
    }).defaultNow(),
    updatedAt: timestamp('updatedAt', {
      withTimezone: true,
      mode: 'date'
    })
      .defaultNow()
      .$onUpdate(() => new Date())
  },
  verificationToken => [
    {
      compositePk: primaryKey({
        columns: [verificationToken.identifier, verificationToken.token]
      })
    }
  ]
);

export const sessionsTable = pgTable('nextauth_sessions', {
  sessionToken: varchar({ length: 255 }).primaryKey(),
  expires: timestamp({ mode: 'date' }).notNull(),
  userId: text('userId')
    .notNull()
    .references(() => usersTable.id, { onDelete: 'cascade' }),
  createdAt: timestamp('createdAt', {
    withTimezone: true,
    mode: 'date'
  }).defaultNow(),
  updatedAt: timestamp('updatedAt', {
    withTimezone: true,
    mode: 'date'
  })
    .defaultNow()
    .$onUpdate(() => new Date())
});

export const bookmarksTable = pgTable('bookmarks', {
  id: text().primaryKey().notNull(),
  userId: text('user_id').references(() => usersTable.id, {
    onDelete: 'cascade'
  }),
  createdAt: timestamp('createdAt', {
    withTimezone: true,
    mode: 'date'
  }).defaultNow(),
  updatedAt: timestamp('updatedAt', {
    withTimezone: true,
    mode: 'date'
  })
    .defaultNow()
    .$onUpdate(() => new Date())
});

export const reportsTable = pgTable('reports', {
  id: text().primaryKey().notNull(),
  repoId: integer().unique(),
  repoAuthor: varchar({ length: 255 }),
  message: text().default('No Message').notNull(),
  userId: text('user_id').references(() => usersTable.id, {
    onDelete: 'set null'
  }),
  valid: boolean().default(true).notNull(),
  repoUrl: varchar({ length: 255 }).unique(),
  createdAt: timestamp('createdAt', {
    withTimezone: true,
    mode: 'date'
  }).defaultNow(),
  updatedAt: timestamp('updatedAt', {
    withTimezone: true,
    mode: 'date'
  })
    .defaultNow()
    .$onUpdate(() => new Date())
});
