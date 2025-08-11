import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertProcessedImageSchema } from "@shared/schema";
import multer from "multer";

const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Upload and process image
  app.post("/api/images/process", upload.single('image'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No image file provided" });
      }

      const { filterType, intensity } = req.body;
      
      if (!filterType) {
        return res.status(400).json({ message: "Filter type is required" });
      }

      // Convert uploaded image to base64
      const imageBase64 = req.file.buffer.toString('base64');
      
      const imageData = {
        originalName: req.file.originalname,
        processedData: imageBase64,
        filterType,
        intensity: parseInt(intensity) || 70
      };

      const validatedData = insertProcessedImageSchema.parse(imageData);
      const processedImage = await storage.createProcessedImage(validatedData);
      
      res.json(processedImage);
    } catch (error) {
      console.error("Error processing image:", error);
      res.status(500).json({ message: "Failed to process image" });
    }
  });

  // Get processed image
  app.get("/api/images/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const image = await storage.getProcessedImage(id);
      
      if (!image) {
        return res.status(404).json({ message: "Image not found" });
      }
      
      res.json(image);
    } catch (error) {
      console.error("Error fetching image:", error);
      res.status(500).json({ message: "Failed to fetch image" });
    }
  });

  // Get recent images
  app.get("/api/images", async (req, res) => {
    try {
      const limit = parseInt(req.query.limit as string) || 10;
      const images = await storage.getRecentImages(limit);
      res.json(images);
    } catch (error) {
      console.error("Error fetching recent images:", error);
      res.status(500).json({ message: "Failed to fetch recent images" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
