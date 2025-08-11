import { type ProcessedImage, type InsertProcessedImage } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getProcessedImage(id: string): Promise<ProcessedImage | undefined>;
  createProcessedImage(image: InsertProcessedImage): Promise<ProcessedImage>;
  getRecentImages(limit?: number): Promise<ProcessedImage[]>;
}

export class MemStorage implements IStorage {
  private processedImages: Map<string, ProcessedImage>;

  constructor() {
    this.processedImages = new Map();
  }

  async getProcessedImage(id: string): Promise<ProcessedImage | undefined> {
    return this.processedImages.get(id);
  }

  async createProcessedImage(insertImage: InsertProcessedImage): Promise<ProcessedImage> {
    const id = randomUUID();
    const image: ProcessedImage = { 
      ...insertImage, 
      id, 
      createdAt: new Date() 
    };
    this.processedImages.set(id, image);
    return image;
  }

  async getRecentImages(limit = 10): Promise<ProcessedImage[]> {
    return Array.from(this.processedImages.values())
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, limit);
  }
}

export const storage = new MemStorage();
