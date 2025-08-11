declare const cv: any;

export interface FaceDetectionResult {
  faces: Array<{
    x: number;
    y: number;
    width: number;
    height: number;
  }>;
  landmarks?: Array<{
    x: number;
    y: number;
  }>;
}

export function waitForOpenCV(): Promise<void> {
  return new Promise((resolve) => {
    if (typeof cv !== 'undefined' && cv.Mat) {
      resolve();
    } else {
      const checkOpenCV = () => {
        if (typeof cv !== 'undefined' && cv.Mat) {
          resolve();
        } else {
          setTimeout(checkOpenCV, 100);
        }
      };
      checkOpenCV();
    }
  });
}

export async function detectFaces(imageElement: HTMLImageElement): Promise<FaceDetectionResult> {
  await waitForOpenCV();
  
  try {
    // Create OpenCV Mat from image
    const src = cv.imread(imageElement);
    const gray = new cv.Mat();
    
    // Convert to grayscale
    cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY);
    
    // Load face classifier
    const faceCascade = new cv.CascadeClassifier();
    faceCascade.load('haarcascade_frontalface_default.xml');
    
    // Detect faces
    const faces = new cv.RectVector();
    const msize = new cv.Size(0, 0);
    faceCascade.detectMultiScale(gray, faces, 1.1, 3, 0, msize, msize);
    
    const detectedFaces = [];
    for (let i = 0; i < faces.size(); i++) {
      const face = faces.get(i);
      detectedFaces.push({
        x: face.x,
        y: face.y,
        width: face.width,
        height: face.height
      });
    }
    
    // Clean up
    src.delete();
    gray.delete();
    faces.delete();
    faceCascade.delete();
    
    return { faces: detectedFaces };
  } catch (error) {
    console.warn('Face detection failed, continuing without detection:', error);
    return { faces: [] };
  }
}

export function createImageFromCanvas(canvas: HTMLCanvasElement): string {
  return canvas.toDataURL('image/png');
}

export function loadImageToCanvas(imageSrc: string): Promise<{ canvas: HTMLCanvasElement; ctx: CanvasRenderingContext2D }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        reject(new Error('Could not get canvas context'));
        return;
      }
      
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      
      resolve({ canvas, ctx });
    };
    
    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = imageSrc;
  });
}
