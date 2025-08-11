import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface FilterSelectorProps {
  selectedCategory: string;
  selectedFilter: string;
  onCategoryChange: (category: string) => void;
  onFilterChange: (filter: string) => void;
}

const filterCategories = [
  { id: 'beautify', label: 'Beautify', icon: 'fas fa-sparkles' },
  { id: 'animals', label: 'Animal Morphing', icon: 'fas fa-paw' },
  { id: 'fantasy', label: 'Fantasy Effects', icon: 'fas fa-hat-wizard' },
  { id: 'vintage', label: 'Vintage Filters', icon: 'fas fa-film' },
];

const beautifyFilters = [
  { id: 'smooth-skin', label: 'Smooth Skin', icon: 'fas fa-sparkles', color: 'from-pink-100 to-pink-200', iconColor: 'text-pink-500' },
  { id: 'enhance-eyes', label: 'Enhance Eyes', icon: 'fas fa-eye', color: 'from-blue-100 to-blue-200', iconColor: 'text-blue-500' },
  { id: 'teeth-whitening', label: 'White Teeth', icon: 'fas fa-smile', color: 'from-yellow-100 to-yellow-200', iconColor: 'text-yellow-500' },
  { id: 'face-slim', label: 'Slim Face', icon: 'fas fa-compress-alt', color: 'from-purple-100 to-purple-200', iconColor: 'text-purple-500' },
];

const animalFilters = [
  { id: 'bunny-ears', label: 'Bunny Ears', icon: 'fas fa-rabbit', color: 'from-pink-100 to-pink-200', iconColor: 'text-pink-600' },
  { id: 'cat-features', label: 'Cat Features', icon: 'fas fa-cat', color: 'from-orange-100 to-orange-200', iconColor: 'text-orange-500' },
  { id: 'dog-nose', label: 'Dog Nose', icon: 'fas fa-dog', color: 'from-amber-100 to-amber-200', iconColor: 'text-amber-600' },
  { id: 'bear-face', label: 'Bear Face', icon: 'fas fa-paw', color: 'from-amber-100 to-amber-300', iconColor: 'text-amber-700' },
];

export function FilterSelector({ selectedCategory, selectedFilter, onCategoryChange, onFilterChange }: FilterSelectorProps) {
  const currentFilters = selectedCategory === 'beautify' ? beautifyFilters : 
                        selectedCategory === 'animals' ? animalFilters : [];

  return (
    <>
      {/* Filter Categories */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Filter Categories</h3>
          
          <div className="space-y-3">
            {filterCategories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "ghost"}
                className={`w-full justify-start px-4 py-3 ${
                  selectedCategory === category.id 
                    ? 'bg-primary text-white' 
                    : 'hover:bg-gray-100'
                }`}
                onClick={() => onCategoryChange(category.id)}
              >
                <i className={`${category.icon} mr-3`}></i>
                <span>{category.label}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Available Filters */}
      {currentFilters.length > 0 && (
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Available Filters</h3>
            
            <div className="grid grid-cols-2 gap-4">
              {currentFilters.map((filter) => (
                <div
                  key={filter.id}
                  className={`filter-item filter-hover cursor-pointer p-3 border rounded-lg transition-all ${
                    selectedFilter === filter.id
                      ? 'border-primary bg-blue-50'
                      : 'border-gray-200 hover:border-primary'
                  }`}
                  onClick={() => onFilterChange(filter.id)}
                >
                  <div className={`w-full h-20 bg-gradient-to-br ${filter.color} rounded-lg mb-2 flex items-center justify-center`}>
                    <i className={`${filter.icon} ${filter.iconColor} text-xl`}></i>
                  </div>
                  <p className="text-sm font-medium text-gray-700 text-center">{filter.label}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}
