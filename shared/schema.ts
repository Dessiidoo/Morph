import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const processedImages = pgTable("processed_images", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  originalName: text("original_name").notNull(),
  processedData: text("processed_data").notNull(), // base64 encoded image
  filterType: text("filter_type").notNull(),
  intensity: integer("intensity").notNull().default(70),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertProcessedImageSchema = createInsertSchema(processedImages).pick({
  originalName: true,
  processedData: true,
  filterType: true,
  intensity: true,
});

export type InsertProcessedImage = z.infer<typeof insertProcessedImageSchema>;
export type ProcessedImage = typeof processedImages.$inferSelect;
