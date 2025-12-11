import React from 'react';
import { MenuItem } from '../types';

interface IngredientOverlayProps {
  item: MenuItem;
  onClose: () => void;
}

// Map ingredients to image URLs
const getIngredientImage = (ingredient: string): string => {
  const ingredientMap: { [key: string]: string } = {
    'Potatoes': 'https://images.unsplash.com/photo-1518977822534-7049a61ee0c2?w=100&h=100&fit=crop',
    'Flour': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100&h=100&fit=crop',
    'Green Peppers': 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=100&h=100&fit=crop',
    'Bell Peppers': 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=100&h=100&fit=crop',
    'Onions': 'https://images.unsplash.com/photo-1618512496249-a7165a42f44a?w=100&h=100&fit=crop',
    'Peas': 'https://images.unsplash.com/photo-1584270354949-c26b0d5b4a0c?w=100&h=100&fit=crop',
    'Cumin Seeds': 'https://images.unsplash.com/photo-1606923829579-0cb981a83e2e?w=100&h=100&fit=crop',
    'Vegetable Oil': 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=100&h=100&fit=crop',
    'Cilantro': 'https://images.unsplash.com/photo-1618375569909-3c8616cf7733?w=100&h=100&fit=crop',
    'Chicken': 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=100&h=100&fit=crop',
    'Beef': 'https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=100&h=100&fit=crop',
    'Lamb': 'https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=100&h=100&fit=crop',
    'Goat': 'https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=100&h=100&fit=crop',
    'Paneer': 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=100&h=100&fit=crop',
    'Spinach': 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=100&h=100&fit=crop',
    'Chickpeas': 'https://images.unsplash.com/photo-1584270354949-c26b0d5b4a0c?w=100&h=100&fit=crop',
    'Eggplant': 'https://images.unsplash.com/photo-1594282418426-62d3c2bb5b3e?w=100&h=100&fit=crop',
    'Tomatoes': 'https://images.unsplash.com/photo-1546097488-9e0b8e8b8c8c?w=100&h=100&fit=crop',
    'Rice': 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=100&h=100&fit=crop',
    'Yogurt': 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=100&h=100&fit=crop',
    'Mango': 'https://images.unsplash.com/photo-1605027990121-fbf190a32a0a?w=100&h=100&fit=crop',
    'Milk': 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=100&h=100&fit=crop',
    'Spices': 'https://images.unsplash.com/photo-1606923829579-0cb981a83e2e?w=100&h=100&fit=crop',
    'Lemon': 'https://images.unsplash.com/photo-1606914469633-bd39206ea739?w=100&h=100&fit=crop',
    'Garlic': 'https://images.unsplash.com/photo-1544507902-7956c3e34dab?w=100&h=100&fit=crop',
    'Ginger': 'https://images.unsplash.com/photo-1604977043463-52b600d2c8e4?w=100&h=100&fit=crop',
    'Cream': 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=100&h=100&fit=crop',
    'Butter': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100&h=100&fit=crop',
    'Ghee': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100&h=100&fit=crop',
    'Almonds': 'https://images.unsplash.com/photo-1606923829579-0cb981a83e2e?w=100&h=100&fit=crop',
    'Nuts': 'https://images.unsplash.com/photo-1606923829579-0cb981a83e2e?w=100&h=100&fit=crop',
    'Pistachios': 'https://images.unsplash.com/photo-1606923829579-0cb981a83e2e?w=100&h=100&fit=crop',
    'Shrimp': 'https://images.unsplash.com/photo-1562967914-608f82629710?w=100&h=100&fit=crop',
    'Crab': 'https://images.unsplash.com/photo-1562967914-608f82629710?w=100&h=100&fit=crop',
    'Fish': 'https://images.unsplash.com/photo-1562967914-608f82629710?w=100&h=100&fit=crop',
    'Coconut Milk': 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=100&h=100&fit=crop',
    'Vinegar': 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=100&h=100&fit=crop',
    'Sugar': 'https://images.unsplash.com/photo-1604977043463-52b600d2c8e4?w=100&h=100&fit=crop',
    'Saffron': 'https://images.unsplash.com/photo-1606923829579-0cb981a83e2e?w=100&h=100&fit=crop',
    'Cardamom': 'https://images.unsplash.com/photo-1606923829579-0cb981a83e2e?w=100&h=100&fit=crop',
    'Rose Water': 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100&h=100&fit=crop',
    'Mint': 'https://images.unsplash.com/photo-1618375569909-3c8616cf7733?w=100&h=100&fit=crop',
    'Cucumber': 'https://images.unsplash.com/photo-1604977043463-52b600d2c8e4?w=100&h=100&fit=crop',
    'Cauliflower': 'https://images.unsplash.com/photo-1594282418426-62d3c2bb5b3e?w=100&h=100&fit=crop',
    'Black Lentils': 'https://images.unsplash.com/photo-1584270354949-c26b0d5b4a0c?w=100&h=100&fit=crop',
    'Kidney Beans': 'https://images.unsplash.com/photo-1584270354949-c26b0d5b4a0c?w=100&h=100&fit=crop',
    'Mixed Vegetables': 'https://images.unsplash.com/photo-1594282418426-62d3c2bb5b3e?w=100&h=100&fit=crop',
    'Tea': 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=100&h=100&fit=crop',
    'Ice': 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100&h=100&fit=crop',
    'Salt': 'https://images.unsplash.com/photo-1604977043463-52b600d2c8e4?w=100&h=100&fit=crop',
    'Water': 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100&h=100&fit=crop',
    'Whole Wheat Flour': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100&h=100&fit=crop',
    'Milk Powder': 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=100&h=100&fit=crop',
    'Mixed Ingredients': 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100&h=100&fit=crop',
    'Fresh Herbs': 'https://images.unsplash.com/photo-1618375569909-3c8616cf7733?w=100&h=100&fit=crop',
  };
  
  return ingredientMap[ingredient] || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100&h=100&fit=crop';
};

const IngredientOverlay: React.FC<IngredientOverlayProps> = ({ item, onClose }) => {
  if (!item.ingredients && !item.allergens && !item.isVegan && !item.isVegetarian && !item.isGlutenFree) {
    return null;
  }

  const ingredients = item.ingredients || [];

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-8"
      onMouseUp={onClose}
      onTouchEnd={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-5xl w-full p-8 relative"
        onMouseUp={(e) => e.stopPropagation()}
        onTouchEnd={(e) => e.stopPropagation()}
      >
        {/* Allergens Section - Top */}
        {item.allergens && item.allergens.length > 0 && (
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="bg-pink-500 text-white px-4 py-2 rounded-lg">
                <span className="font-semibold">Allergens</span>
              </div>
              <div className="flex items-center gap-4 flex-wrap">
                {item.allergens.map((allergen, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-yellow-900 font-bold text-xl">{allergen.charAt(0)}</span>
                    </div>
                    <span className="text-2xl font-semibold text-gray-800">{allergen}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Main Content - Two Column Layout */}
        <div className="grid grid-cols-2 gap-8">
          {/* Left Side - Product Image and Info */}
          <div className="flex flex-col">
            <div className="w-full h-64 bg-gray-200 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
              {item.image ? (
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              ) : (
                <span className="text-gray-400">Food Image</span>
              )}
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">{item.name}</h3>
            {item.description && (
              <p className="text-gray-600 mb-4 text-sm leading-relaxed">{item.description}</p>
            )}
            <div className="flex flex-wrap gap-2">
              {item.isVegan && (
                <div className="flex items-center gap-2 bg-green-100 px-3 py-1 rounded-full">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-xs">V</span>
                  </div>
                  <span className="text-green-700 font-semibold text-sm">Vegan</span>
                </div>
              )}
              {item.isVegetarian && !item.isVegan && (
                <div className="flex items-center gap-2 bg-green-100 px-3 py-1 rounded-full">
                  <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-xs">V</span>
                  </div>
                  <span className="text-green-700 font-semibold text-sm">Vegetarian</span>
                </div>
              )}
              {item.isGlutenFree && (
                <div className="flex items-center gap-2 bg-blue-100 px-3 py-1 rounded-full">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-xs">GF</span>
                  </div>
                  <span className="text-blue-700 font-semibold text-sm">Gluten Free</span>
                </div>
              )}
            </div>
          </div>

          {/* Right Side - Ingredients */}
          <div className="flex flex-col">
            <h4 className="text-xl font-bold text-gray-800 mb-4">Ingredients</h4>
            <div className="grid grid-cols-2 gap-4">
              {ingredients.map((ingredient, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="w-20 h-20 bg-gray-200 rounded-lg mb-2 flex items-center justify-center overflow-hidden">
                    <img
                      src={getIngredientImage(ingredient)}
                      alt={ingredient}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                        (e.target as HTMLImageElement).parentElement!.innerHTML = `<span class="text-xs text-gray-600 text-center px-2 font-medium">${ingredient}</span>`;
                      }}
                    />
                  </div>
                  <span className="text-sm text-gray-700 font-medium text-center">{ingredient}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IngredientOverlay;
