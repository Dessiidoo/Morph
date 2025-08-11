import { loadImageToCanvas, createImageFromCanvas, detectFaces } from './opencv-utils';
import { applyBeautifyFilter, applyAnimalFilter } from './filters';

export async function processImageWithFilter(
  imageSrc: string, 
  filterType: string, 
  intensity: number = 70
): Promise<string> {
  try {
    const { canvas, ctx } = await loadImageToCanvas(imageSrc);
    
    // Create image element for face detection
    const img = new Image();
    img.crossOrigin = 'anonymous';
    
    return new Promise((resolve, reject) => {
      img.onload = async () => {
        try {
          // Detect faces in the image
          const faceData = await detectFaces(img);
          
          // Apply the selected filter
          if (filterType.includes('smooth-skin') || filterType.includes('enhance-eyes') || 
              filterType.includes('teeth-whitening') || filterType.includes('face-slim')) {
            await applyBeautifyFilter(canvas, ctx, filterType, intensity, faceData);
          } else if (filterType.includes('bunny') || filterType.includes('cat') || 
                     filterType.includes('dog') || filterType.includes('bear')) {
            await applyAnimalFilter(canvas, ctx, filterType, intensity, faceData);
          }
          
          // Return processed image
          resolve(createImageFromCanvas(canvas));
        } catch (error) {
          reject(error);
        }
      };
      
      img.onerror = () => reject(new Error('Failed to load image for processing'));
      img.src = imageSrc;
    });
    
  } catch (error) {
    console.error('Error processing image:', error);
    throw error;
  }
}

export function downloadImage(imageData: string, filename: string = 'processed-image.png') {
  const link = document.createElement('a');
  link.href = imageData;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
