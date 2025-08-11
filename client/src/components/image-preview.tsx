import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface ImagePreviewProps {
  uploadedImage: string | null;
  processedImage: string | null;
  isProcessing: boolean;
}

export function ImagePreview({ uploadedImage, processedImage, isProcessing }: ImagePreviewProps) {
  const [showComparison, setShowComparison] = useState(false);

  const handleDownload = () => {
    const imageToDownload = processedImage || uploadedImage;
    if (!imageToDownload) return;

    const link = document.createElement('a');
    link.href = imageToDownload;
    link.download = `faceswap-studio-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const displayImage = processedImage || uploadedImage;

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Preview</h2>
          <div className="flex items-center space-x-4">
            {uploadedImage && processedImage && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowComparison(!showComparison)}
              >
                <i className="fas fa-adjust mr-1"></i>
                Before/After
              </Button>
            )}
            {displayImage && (
              <Button
                className="bg-secondary text-white hover:bg-pink-600"
                onClick={handleDownload}
              >
                <i className="fas fa-download mr-2"></i>
                Download
              </Button>
            )}
          </div>
        </div>

        {/* Image Preview Area */}
        <div className="relative bg-gray-100 rounded-xl min-h-96 flex items-center justify-center overflow-hidden">
          {!displayImage && (
            <div className="text-center py-16">
              <i className="fas fa-image text-6xl text-gray-300 mb-4"></i>
              <p className="text-xl text-gray-500 mb-2">No image uploaded yet</p>
              <p className="text-gray-400">Upload a photo to start editing</p>
            </div>
          )}

          {displayImage && !showComparison && (
            <div className="relative w-full h-full fade-in">
              <img 
                src={displayImage} 
                alt="Preview" 
                className="w-full h-full object-contain rounded-lg max-h-96" 
              />
            </div>
          )}

          {showComparison && uploadedImage && processedImage && (
            <div className="grid grid-cols-2 gap-4 w-full h-full">
              <div className="text-center">
                <p className="text-sm font-medium text-gray-600 mb-2">Before</p>
                <img 
                  src={uploadedImage} 
                  alt="Original" 
                  className="w-full h-full object-contain rounded-lg max-h-80" 
                />
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-gray-600 mb-2">After</p>
                <img 
                  src={processedImage} 
                  alt="Processed" 
                  className="w-full h-full object-contain rounded-lg max-h-80" 
                />
              </div>
            </div>
          )}

          {/* Processing State */}
          {isProcessing && (
            <div className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center">
              <div className="text-center">
                <i className="fas fa-cog processing-spin text-4xl text-primary mb-4"></i>
                <p className="text-lg font-medium text-gray-800">Processing your image...</p>
                <p className="text-sm text-gray-600">This may take a few seconds</p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
