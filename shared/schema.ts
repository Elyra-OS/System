import { sql } from "drizzle-orm";
import { pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export interface CharacterProfile {
  name: string;
  avatar: string;
  age: string;
  height: string;
  weight: string;
  description: string;
  personalityTraits: string[];
  topicsOfInterest: string[];
}

export interface TokenData {
  id: string;
  name: string;
  symbol: string;
  logo: string;
  contractAddress: string;
  price: string;
  priceChange: number;
  marketCap: string;
  holders: string;
  liquidity: string;
}

export interface MCPTool {
  id: string;
  name: string;
  version: string;
  toolCount: number;
  status: "active" | "inactive";
  description: string;
  features: string[];
  pricing: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface HeroContent {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
}
