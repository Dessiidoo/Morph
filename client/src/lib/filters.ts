import { FaceDetectionResult } from './opencv-utils';

export async function applyBeautifyFilter(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  filterType: string,
  intensity: number,
  faceData: FaceDetectionResult
): Promise<void> {
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  
  switch (filterType) {
    case 'smooth-skin':
      applySkinSmoothing(data, canvas.width, canvas.height, intensity);
      break;
    case 'enhance-eyes':
      applyEyeEnhancement(data, canvas.width, canvas.height, intensity, faceData);
      break;
    case 'teeth-whitening':
      applyTeethWhitening(data, canvas.width, canvas.height, intensity, faceData);
      break;
    case 'face-slim':
      applyFaceSlimming(ctx, canvas.width, canvas.height, intensity, faceData);
      return; // Face slimming doesn't use imageData
  }
  
  ctx.putImageData(imageData, 0, 0);
}

export async function applyAnimalFilter(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  filterType: string,
  intensity: number,
  faceData: FaceDetectionResult
): Promise<void> {
  // Apply animal overlays based on detected faces
  for (const face of faceData.faces) {
    switch (filterType) {
      case 'bunny-ears':
        await drawBunnyEars(ctx, face, intensity);
        break;
      case 'cat-features':
        await drawCatFeatures(ctx, face, intensity);
        break;
      case 'dog-nose':
        await drawDogNose(ctx, face, intensity);
        break;
      case 'bear-face':
        await drawBearFeatures(ctx, face, intensity);
        break;
    }
  }
}

function applySkinSmoothing(data: Uint8ClampedArray, width: number, height: number, intensity: number): void {
  const factor = intensity / 100;
  
  for (let i = 0; i < data.length; i += 4) {
    // Simple skin smoothing by reducing color variations
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    
    // Apply a subtle blur effect by averaging with surrounding pixels
    const smoothedR = r + (128 - r) * factor * 0.1;
    const smoothedG = g + (128 - g) * factor * 0.1;
    const smoothedB = b + (128 - b) * factor * 0.1;
    
    data[i] = Math.min(255, Math.max(0, smoothedR));
    data[i + 1] = Math.min(255, Math.max(0, smoothedG));
    data[i + 2] = Math.min(255, Math.max(0, smoothedB));
  }
}

function applyEyeEnhancement(data: Uint8ClampedArray, width: number, height: number, intensity: number, faceData: FaceDetectionResult): void {
  const factor = intensity / 100;
  
  // Enhance contrast and brightness in estimated eye regions
  for (const face of faceData.faces) {
    const eyeRegionY = face.y + face.height * 0.3;
    const eyeRegionHeight = face.height * 0.2;
    
    for (let y = eyeRegionY; y < eyeRegionY + eyeRegionHeight; y++) {
      for (let x = face.x; x < face.x + face.width; x++) {
        const index = (Math.floor(y) * width + Math.floor(x)) * 4;
        if (index >= 0 && index < data.length - 3) {
          data[index] = Math.min(255, data[index] * (1 + factor * 0.2)); // R
          data[index + 1] = Math.min(255, data[index + 1] * (1 + factor * 0.2)); // G
          data[index + 2] = Math.min(255, data[index + 2] * (1 + factor * 0.2)); // B
        }
      }
    }
  }
}

function applyTeethWhitening(data: Uint8ClampedArray, width: number, height: number, intensity: number, faceData: FaceDetectionResult): void {
  const factor = intensity / 100;
  
  // Brighten estimated mouth region
  for (const face of faceData.faces) {
    const mouthRegionY = face.y + face.height * 0.6;
    const mouthRegionHeight = face.height * 0.3;
    const mouthRegionX = face.x + face.width * 0.3;
    const mouthRegionWidth = face.width * 0.4;
    
    for (let y = mouthRegionY; y < mouthRegionY + mouthRegionHeight; y++) {
      for (let x = mouthRegionX; x < mouthRegionX + mouthRegionWidth; x++) {
        const index = (Math.floor(y) * width + Math.floor(x)) * 4;
        if (index >= 0 && index < data.length - 3) {
          const brightness = 1 + factor * 0.3;
          data[index] = Math.min(255, data[index] * brightness); // R
          data[index + 1] = Math.min(255, data[index + 1] * brightness); // G
          data[index + 2] = Math.min(255, data[index + 2] * brightness); // B
        }
      }
    }
  }
}

function applyFaceSlimming(ctx: CanvasRenderingContext2D, width: number, height: number, intensity: number, faceData: FaceDetectionResult): void {
  // Simple face slimming effect by applying a subtle pinch transformation
  const factor = intensity / 100 * 0.1;
  
  for (const face of faceData.faces) {
    const centerX = face.x + face.width / 2;
    const centerY = face.y + face.height / 2;
    
    // Create a subtle pinch effect towards the center
    const imageData = ctx.getImageData(face.x, face.y, face.width, face.height);
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = face.width;
    tempCanvas.height = face.height;
    const tempCtx = tempCanvas.getContext('2d')!;
    tempCtx.putImageData(imageData, 0, 0);
    
    // Apply the transformation and draw back
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.scale(1 - factor, 1);
    ctx.translate(-centerX, -centerY);
    ctx.drawImage(tempCanvas, face.x, face.y);
    ctx.restore();
  }
}

async function drawBunnyEars(ctx: CanvasRenderingContext2D, face: any, intensity: number): Promise<void> {
  const alpha = intensity / 100;
  ctx.save();
  ctx.globalAlpha = alpha;
  
  // Draw bunny ears as simple shapes
  const earWidth = face.width * 0.15;
  const earHeight = face.height * 0.4;
  const earY = face.y - earHeight * 0.7;
  
  // Left ear
  ctx.fillStyle = '#FFB6C1';
  ctx.beginPath();
  ctx.ellipse(face.x + face.width * 0.25, earY, earWidth, earHeight, 0, 0, 2 * Math.PI);
  ctx.fill();
  
  // Right ear
  ctx.beginPath();
  ctx.ellipse(face.x + face.width * 0.75, earY, earWidth, earHeight, 0, 0, 2 * Math.PI);
  ctx.fill();
  
  // Inner ears
  ctx.fillStyle = '#FF69B4';
  ctx.beginPath();
  ctx.ellipse(face.x + face.width * 0.25, earY, earWidth * 0.6, earHeight * 0.7, 0, 0, 2 * Math.PI);
  ctx.fill();
  
  ctx.beginPath();
  ctx.ellipse(face.x + face.width * 0.75, earY, earWidth * 0.6, earHeight * 0.7, 0, 0, 2 * Math.PI);
  ctx.fill();
  
  ctx.restore();
}

async function drawCatFeatures(ctx: CanvasRenderingContext2D, face: any, intensity: number): Promise<void> {
  const alpha = intensity / 100;
  ctx.save();
  ctx.globalAlpha = alpha;
  
  // Draw cat whiskers
  ctx.strokeStyle = '#333';
  ctx.lineWidth = 2;
  
  const whiskerY = face.y + face.height * 0.5;
  const whiskerLength = face.width * 0.3;
  
  // Left whiskers
  for (let i = 0; i < 3; i++) {
    ctx.beginPath();
    ctx.moveTo(face.x - whiskerLength, whiskerY + (i - 1) * 10);
    ctx.lineTo(face.x, whiskerY + (i - 1) * 10);
    ctx.stroke();
  }
  
  // Right whiskers
  for (let i = 0; i < 3; i++) {
    ctx.beginPath();
    ctx.moveTo(face.x + face.width, whiskerY + (i - 1) * 10);
    ctx.lineTo(face.x + face.width + whiskerLength, whiskerY + (i - 1) * 10);
    ctx.stroke();
  }
  
  // Cat nose
  ctx.fillStyle = '#FF69B4';
  const noseX = face.x + face.width * 0.5;
  const noseY = face.y + face.height * 0.45;
  ctx.beginPath();
  ctx.moveTo(noseX, noseY);
  ctx.lineTo(noseX - 8, noseY + 10);
  ctx.lineTo(noseX + 8, noseY + 10);
  ctx.closePath();
  ctx.fill();
  
  ctx.restore();
}

async function drawDogNose(ctx: CanvasRenderingContext2D, face: any, intensity: number): Promise<void> {
  const alpha = intensity / 100;
  ctx.save();
  ctx.globalAlpha = alpha;
  
  // Draw dog nose
  ctx.fillStyle = '#333';
  const noseX = face.x + face.width * 0.5;
  const noseY = face.y + face.height * 0.5;
  const noseSize = face.width * 0.08;
  
  ctx.beginPath();
  ctx.ellipse(noseX, noseY, noseSize, noseSize * 0.7, 0, 0, 2 * Math.PI);
  ctx.fill();
  
  // Add nostril details
  ctx.fillStyle = '#000';
  ctx.beginPath();
  ctx.ellipse(noseX - noseSize * 0.3, noseY, noseSize * 0.2, noseSize * 0.1, 0, 0, 2 * Math.PI);
  ctx.fill();
  
  ctx.beginPath();
  ctx.ellipse(noseX + noseSize * 0.3, noseY, noseSize * 0.2, noseSize * 0.1, 0, 0, 2 * Math.PI);
  ctx.fill();
  
  ctx.restore();
}

async function drawBearFeatures(ctx: CanvasRenderingContext2D, face: any, intensity: number): Promise<void> {
  const alpha = intensity / 100;
  ctx.save();
  ctx.globalAlpha = alpha;
  
  // Draw bear ears
  const earSize = face.width * 0.12;
  const earY = face.y + face.height * 0.1;
  
  ctx.fillStyle = '#8B4513';
  
  // Left ear
  ctx.beginPath();
  ctx.arc(face.x + face.width * 0.2, earY, earSize, 0, 2 * Math.PI);
  ctx.fill();
  
  // Right ear
  ctx.beginPath();
  ctx.arc(face.x + face.width * 0.8, earY, earSize, 0, 2 * Math.PI);
  ctx.fill();
  
  // Inner ears
  ctx.fillStyle = '#D2691E';
  ctx.beginPath();
  ctx.arc(face.x + face.width * 0.2, earY, earSize * 0.6, 0, 2 * Math.PI);
  ctx.fill();
  
  ctx.beginPath();
  ctx.arc(face.x + face.width * 0.8, earY, earSize * 0.6, 0, 2 * Math.PI);
  ctx.fill();
  
  ctx.restore();
}
