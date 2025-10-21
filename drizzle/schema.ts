import { mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  id: varchar("id", { length: 64 }).primaryKey(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin", "parceiro", "backoffice"]).default("user").notNull(),
  tenantId: varchar("tenantId", { length: 64 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow(),
});

export const tenants = mysqlTable("tenants", {
  id: varchar("id", { length: 64 }).primaryKey(),
  name: text("name").notNull(),
  logoUrl: text("logoUrl"),
  s3Prefix: varchar("s3Prefix", { length: 128 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
});

export const reports = mysqlTable("reports", {
  id: varchar("id", { length: 64 }).primaryKey(),
  tenantId: varchar("tenantId", { length: 64 }).notNull(),
  userId: varchar("userId", { length: 64 }).notNull(),
  standard: varchar("standard", { length: 32 }).notNull(),
  title: text("title").notNull(),
  status: mysqlEnum("status", ["draft", "processing", "completed", "failed"]).default("draft").notNull(),
  s3Key: text("s3Key"),
  s3Url: text("s3Url"),
  metadata: text("metadata"),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// TODO: Add your tables here
