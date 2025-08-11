import { useState } from "react";
import { ImageUpload } from "@/components/image-upload";
import { FilterSelector } from "@/components/filter-selector";
import { ImagePreview } from "@/components/image-preview";
import { ProcessingControls } from "@/components/processing-controls";

export default function ImageEditor() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<string>("smooth-skin");
  const [filterCategory, setFilterCategory] = useState<string>("beautify");
  const [intensity, setIntensity] = useState<number>(70);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="gradient-bg text-white shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <i className="fas fa-magic text-2xl"></i>
              <h1 className="text-2xl font-bold">FaceSwap Studio</h1>
            </div>
            <nav className="hidden md:flex space-x-6">
              <a href="#" className="hover:text-gray-200 transition-colors">Features</a>
              <a href="#" className="hover:text-gray-200 transition-colors">Gallery</a>
              <a href="#" className="hover:text-gray-200 transition-colors">Pricing</a>
            </nav>
            <div className="md:hidden">
              <i className="fas fa-bars text-xl cursor-pointer"></i>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Panel - Upload & Controls */}
          <div className="lg:col-span-1 space-y-6">
            <ImageUpload 
              onImageUpload={setUploadedImage}
              uploadedImage={uploadedImage}
            />
            
            <FilterSelector 
              selectedCategory={filterCategory}
              selectedFilter={selectedFilter}
              onCategoryChange={setFilterCategory}
              onFilterChange={setSelectedFilter}
            />

            <ProcessingControls
              intensity={intensity}
              onIntensityChange={setIntensity}
              uploadedImage={uploadedImage}
              selectedFilter={selectedFilter}
              isProcessing={isProcessing}
              onProcessingStart={() => setIsProcessing(true)}
              onProcessingComplete={(result) => {
                setProcessedImage(result);
                setIsProcessing(false);
              }}
              onReset={() => {
                setProcessedImage(null);
                setUploadedImage(null);
              }}
            />
          </div>

          {/* Center Panel - Image Preview */}
          <div className="lg:col-span-2">
            <ImagePreview
              uploadedImage={uploadedImage}
              processedImage={processedImage}
              isProcessing={isProcessing}
            />
          </div>
        </div>

        {/* Features Section */}
        <section className="mt-16 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Powerful AI Features</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-brain text-white text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Smart Face Detection</h3>
              <p className="text-gray-600">Advanced AI algorithms automatically detect facial features and landmarks for precise editing.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-magic text-white text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">One-Click Beautification</h3>
              <p className="text-gray-600">Apply professional-grade beauty filters with a single click. Smooth skin, enhance features, and more.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-paw text-white text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Animal Morphing</h3>
              <p className="text-gray-600">Transform into your favorite animals with realistic overlays and morphing effects.</p>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Before & After Gallery</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="relative">
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300" 
                     alt="Beauty Enhancement Example" className="w-full h-48 object-cover" />
                <div className="absolute top-2 left-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">Before</div>
              </div>
              <div className="p-4">
                <p className="text-sm text-gray-600">Beauty Enhancement</p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="relative">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300" 
                     alt="Animal Filter Example" className="w-full h-48 object-cover" />
                <div className="absolute top-2 left-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">After</div>
              </div>
              <div className="p-4">
                <p className="text-sm text-gray-600">Cat Features</p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="relative">
                <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300" 
                     alt="Teeth Whitening Example" className="w-full h-48 object-cover" />
                <div className="absolute top-2 left-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">Before</div>
              </div>
              <div className="p-4">
                <p className="text-sm text-gray-600">Teeth Whitening</p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="relative">
                <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300" 
                     alt="Bunny Transformation Example" className="w-full h-48 object-cover" />
                <div className="absolute top-2 left-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">After</div>
              </div>
              <div className="p-4">
                <p className="text-sm text-gray-600">Bunny Transformation</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-850 text-white mt-16 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <i className="fas fa-magic text-2xl"></i>
              <span className="text-lg font-semibold">FaceSwap Studio</span>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Support</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
