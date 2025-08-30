import { pgTable, varchar, pgEnum, timestamp, index, uniqueIndex } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

const timestamps = {
  createdAt: timestamp().defaultNow().notNull()
}

export const providerEnum = pgEnum('provider', ['google'])

export const users = pgTable('users', {
  id: varchar({ length: 36 }).primaryKey().$defaultFn(() => crypto.randomUUID()),
  email: varchar({ length: 255 }).notNull(),
  name: varchar({ length: 100 }).notNull(),
  avatar: varchar({ length: 500 }).notNull(),
  provider: providerEnum().notNull(),
  providerId: varchar({ length: 50 }).notNull(),
  ...timestamps
}, table => [
  uniqueIndex('users_provider_id_idx').on(table.provider, table.providerId)
])

export const usersRelations = relations(users, ({ many }) => ({
  favorities: many(favorities)
}))

export const favorities = pgTable('favorities', {
  id: varchar({ length: 36 }).primaryKey().$defaultFn(() => crypto.randomUUID()),
  userId: varchar({ length: 36 }).notNull().references(() => users.id, { onDelete: 'cascade' }),
  attractionId: varchar({ length: 12 }).notNull(),
  ...timestamps
}, table => [
  index('favorities_user_id_idx').on(table.userId)
])

export const favoritiesRelations = relations(favorities, ({ one }) => ({
  user: one(users, {
    fields: [favorities.userId],
    references: [users.id]
  }),
}))


export type User = typeof users.$inferSelect
export type Favorite = typeof favorities.$inferSelect