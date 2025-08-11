import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import { processImageWithFilter } from "@/lib/image-processor";

interface ProcessingControlsProps {
  intensity: number;
  onIntensityChange: (intensity: number) => void;
  uploadedImage: string | null;
  selectedFilter: string;
  isProcessing: boolean;
  onProcessingStart: () => void;
  onProcessingComplete: (result: string) => void;
  onReset: () => void;
}

export function ProcessingControls({
  intensity,
  onIntensityChange,
  uploadedImage,
  selectedFilter,
  isProcessing,
  onProcessingStart,
  onProcessingComplete,
  onReset
}: ProcessingControlsProps) {
  const { toast } = useToast();

  const handleApplyFilter = async () => {
    if (!uploadedImage) {
      toast({
        title: "No image uploaded",
        description: "Please upload an image first.",
        variant: "destructive",
      });
      return;
    }

    onProcessingStart();
    
    try {
      const processedImage = await processImageWithFilter(uploadedImage, selectedFilter, intensity);
      onProcessingComplete(processedImage);
      
      toast({
        title: "Filter applied successfully",
        description: "Your image has been processed.",
      });
    } catch (error) {
      console.error("Error processing image:", error);
      toast({
        title: "Processing failed",
        description: "Unable to process the image. Please try again.",
        variant: "destructive",
      });
      onProcessingComplete(uploadedImage); // Fallback to original
    }
  };

  const handleReset = () => {
    onReset();
    toast({
      title: "Image reset",
      description: "Returned to original image.",
    });
  };

  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Controls</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Intensity: {intensity}%
            </label>
            <Slider
              value={[intensity]}
              onValueChange={(value) => onIntensityChange(value[0])}
              max={100}
              min={0}
              step={1}
              className="w-full"
              disabled={isProcessing}
            />
          </div>
          
          <div className="flex space-x-3">
            <Button 
              className="flex-1 bg-accent text-white hover:bg-emerald-600"
              onClick={handleApplyFilter}
              disabled={!uploadedImage || isProcessing}
            >
              {isProcessing ? (
                <>
                  <i className="fas fa-spinner fa-spin mr-2"></i>
                  Processing...
                </>
              ) : (
                <>
                  <i className="fas fa-play mr-2"></i>
                  Apply Filter
                </>
              )}
            </Button>
            <Button 
              variant="outline"
              size="icon"
              onClick={handleReset}
              disabled={!uploadedImage || isProcessing}
            >
              <i className="fas fa-undo"></i>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
