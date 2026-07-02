import {
  pgTable,
  bigserial,
  bigint,
  uuid,
  varchar,
  boolean,
  integer,
  timestamp,
  index,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

import { userTable } from "./user.schema";

export const urlTable = pgTable(
  "urls",
  {
    id: bigserial("id", { mode: "bigint" }).primaryKey(),

    urlId: uuid("url_id")
      .default(sql`gen_random_uuid()`)
      .notNull()
      .unique(),

    userId: bigint("user_id", {
      mode: "bigint",
    })
      .notNull()
      .references(() => userTable.id, {
        onDelete: "cascade",
        onUpdate: "restrict",
      }),

    originalUrl: varchar("original_url", {
      length: 2048,
    }).notNull(),

    shortCode: varchar("short_code", {
      length: 20,
    })
      .notNull()
      .unique(),

    title: varchar("title", {
      length: 255,
    }),

    isActive: boolean("is_active").default(true).notNull(),

    clickCount: integer("click_count").default(0).notNull(),

    shareCount: integer("share_count").default(0).notNull(),

    expirationDate: timestamp("expiration_date", {
      withTimezone: true,
      mode: "date",
    }),

    createdAt: timestamp("created_at", {
      withTimezone: true,
      mode: "date",
    })
      .defaultNow()
      .notNull(),

    updatedAt: timestamp("updated_at", {
      withTimezone: true,
      mode: "date",
    })
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),

    deletedAt: timestamp("deleted_at", {
      withTimezone: true,
      mode: "date",
    }),
  },
  (table) => ({
    userIdIdx: index("urls_user_id_idx").on(table.userId),

    activeIdx: index("urls_active_idx").on(table.isActive),

    expirationIdx: index("urls_expiration_idx").on(table.expirationDate),

    userActiveIdx: index("urls_user_active_idx").on(
      table.userId,
      table.isActive,
    ),
  }),
);
