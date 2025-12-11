import React, { useState, useEffect } from 'react';
import { MenuItem, CartItem } from '../types';
import IngredientOverlay from './IngredientOverlay';

interface MenuScreenProps {
  categories: string[];
  menuItems: MenuItem[];
  cart: CartItem[];
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
  onItemClick: (item: MenuItem) => void;
  onAddToCart: (item: MenuItem) => void;
  onUpdateQuantity: (itemId: string, delta: number) => void;
  onCheckout: () => void;
  onBackToSplash: () => void;
}

const MenuScreen: React.FC<MenuScreenProps> = ({
  categories,
  menuItems,
  cart,
  selectedCategory,
  onCategorySelect,
  onItemClick,
  onAddToCart,
  onUpdateQuantity,
  onCheckout,
  onBackToSplash,
}) => {
  const [showIngredientOverlay, setShowIngredientOverlay] = useState(false);
  const [selectedItemForOverlay, setSelectedItemForOverlay] = useState<MenuItem | null>(null);
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [isHolding, setIsHolding] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [hasSeenTapHint, setHasSeenTapHint] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const filteredItems = menuItems.filter(item => item.category === selectedCategory);
  
  // Apply filter if active
  const matchesFilter = (item: MenuItem): boolean => {
    if (!activeFilter) return true;
    switch (activeFilter) {
      case 'vegan':
        return item.isVegan === true;
      case 'vegetarian':
        return item.isVegetarian === true || item.isVegan === true;
      case 'gluten-free':
        return item.isGlutenFree === true;
      default:
        return true;
    }
  };
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.item.price * item.quantity, 0);

  const handleItemClick = (item: MenuItem) => {
    setSelectedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(item.id)) {
        newSet.delete(item.id);
      } else {
        newSet.add(item.id);
      }
      return newSet;
    });
  };

  // Close overlay when clicking outside
  useEffect(() => {
    const handleMouseUp = () => {
      if (isHolding) {
        setIsHolding(false);
        setShowIngredientOverlay(false);
        setSelectedItemForOverlay(null);
      }
    };

    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchend', handleMouseUp);

    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchend', handleMouseUp);
    };
  }, [isHolding]);

  const handleItemMouseDown = (item: MenuItem, e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    if (item.ingredients || item.allergens || item.isVegan || item.isVegetarian || item.isGlutenFree) {
      setIsHolding(true);
      setSelectedItemForOverlay(item);
      setShowIngredientOverlay(true);
      // Hide hint after first use
      if (item.id === 'samosas' && !hasSeenTapHint) {
        setHasSeenTapHint(true);
      }
    }
  };

  const handleItemMouseUp = () => {
    setIsHolding(false);
    setShowIngredientOverlay(false);
    setSelectedItemForOverlay(null);
  };

  const handleAddToOrder = () => {
    selectedItems.forEach(itemId => {
      const item = menuItems.find(i => i.id === itemId);
      if (item) {
        if (item.customizations) {
          onItemClick(item);
        } else {
          onAddToCart(item);
        }
      }
    });
    setSelectedItems(new Set());
  };

  return (
    <div className="h-screen bg-gray-100 flex flex-col overflow-hidden">
      {/* Header - Fixed */}
      <div className="bg-white shadow-sm flex-shrink-0 z-10">
        <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
          <h1 className="text-4xl font-serif text-gray-800">Aarka</h1>
          <div className="flex-1 max-w-md mx-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                className="w-full bg-gray-100 rounded-full px-6 py-3 pl-12 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <svg
                className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveFilter(activeFilter === 'vegan' ? null : 'vegan')}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                activeFilter === 'vegan'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Vegan
            </button>
            <button
              onClick={() => setActiveFilter(activeFilter === 'vegetarian' ? null : 'vegetarian')}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                activeFilter === 'vegetarian'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Vegetarian
            </button>
            <button
              onClick={() => setActiveFilter(activeFilter === 'gluten-free' ? null : 'gluten-free')}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                activeFilter === 'gluten-free'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Gluten Free
            </button>
          </div>
          <button
            onClick={() => setShowConfirmDialog(true)}
            className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors shadow-lg"
            aria-label="Back to splash screen"
          >
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={4}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Main Content Area - Flex container */}
      <div className="flex-1 flex gap-6 px-8 py-6 overflow-hidden max-w-7xl mx-auto w-full">
        {/* Left Sidebar - Categories - Fixed */}
        <div className="w-48 flex-shrink-0">
          <div className="bg-blue-50 rounded-2xl p-4 space-y-2 h-full overflow-y-auto">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => onCategorySelect(category)}
                className={`w-full text-left px-4 py-3 rounded-xl transition-colors ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white font-semibold'
                    : 'bg-white text-gray-800 hover:bg-blue-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Center - Menu Items - Scrollable */}
        <div 
          className="flex-1 relative overflow-y-auto"
          onClick={(e) => {
            // Deselect all if clicking on the container (not on an item)
            if (e.target === e.currentTarget) {
              setSelectedItems(new Set());
            }
          }}
        >
          <div className="grid grid-cols-3 gap-4 pb-8">
            {filteredItems.map((item) => {
              const matches = matchesFilter(item);
              return (
              <div
                key={item.id}
                className={`bg-white rounded-2xl shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col relative ${
                  selectedItems.has(item.id) ? 'border-2 border-blue-500' : 'border-2 border-transparent'
                } ${!matches && activeFilter ? 'opacity-40' : ''}`}
                onClick={() => handleItemClick(item)}
              >
                <div
                  className="relative w-full h-56 bg-gray-200 flex items-center justify-center flex-shrink-0 overflow-hidden rounded-t-2xl"
                  onMouseDown={(e) => handleItemMouseDown(item, e)}
                  onMouseUp={handleItemMouseUp}
                  onMouseLeave={handleItemMouseUp}
                  onTouchStart={(e) => handleItemMouseDown(item, e)}
                  onTouchEnd={handleItemMouseUp}
                >
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-gray-400">Food Image</span>
                  )}
                  {/* Show animated hand gesture hint only on Samosa and only once */}
                  {item.id === 'samosas' && !hasSeenTapHint && (
                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-3 py-2 rounded-full flex items-center gap-2 animate-tap-hand z-10 shadow-lg">
                      <svg 
                        className="w-6 h-6" 
                        fill="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path d="M9 11.24V7.5a2.5 2.5 0 0 1 5 0v3.74c1.21-.81 2-2.18 2-3.74C16 5.01 13.99 3 11.5 3S7 5.01 7 7.5c0 1.56.79 2.93 2 3.74zm9.84 4.63l-4.54-2.26c-.17-.07-.35-.11-.54-.11H13v-6c0-.83-.67-1.5-1.5-1.5S10 6.67 10 7.5v10.74l-1.43-.57c-.08-.03-.15-.08-.24-.1-.46-.07-.92.02-1.33.27L7 19.78l4.61 2.28c.36.18.78.18 1.14 0L21 18.51l-2.16-2.64z"/>
                      </svg>
                      <span className="font-semibold">Tap & Hold</span>
                    </div>
                  )}
                </div>
                <div className="p-4 text-center flex-1 flex flex-col justify-center relative">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{item.name}</h3>
                  <div className="flex items-center justify-center gap-2">
                    <span className="bg-gray-100 text-gray-700 px-4 py-1 rounded-full font-semibold inline-block">
                      ${item.price.toFixed(2)}
                    </span>
                    {/* Customization Button - Show on items with customizations */}
                    {item.customizations && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onItemClick(item);
                        }}
                        className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
                        title="Customize"
                      >
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
            })}
          </div>

          {/* Bottom Center Add to Order Button */}
          {selectedItems.size > 0 && (
            <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-10">
              <button
                onClick={handleAddToOrder}
                className="bg-blue-600 text-white px-12 py-4 rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg"
              >
                Add To Order {selectedItems.size > 1 ? `(${selectedItems.size})` : ''}
              </button>
            </div>
          )}
        </div>

        {/* Right Sidebar - Order Summary - Fixed */}
        <div className="w-80 flex-shrink-0">
          <div className="bg-white rounded-2xl p-6 shadow-sm h-full flex flex-col">
            <div className="flex items-center gap-2 mb-4 flex-shrink-0">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <h2 className="text-xl font-bold text-gray-800">Order Summary</h2>
            </div>
            <div className="border-t border-gray-200 pt-4 mb-4 flex-1 overflow-y-auto">
              {cart.length === 0 ? (
                <p className="text-gray-500 text-center py-8">Your cart is empty</p>
              ) : (
                <div className="space-y-3">
                  {cart.map((cartItem, index) => {
                    const uniqueKey = `${cartItem.item.id}-${JSON.stringify(cartItem.customizations)}-${index}`;
                    return (
                      <div key={uniqueKey} className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <div className="text-gray-700 font-medium">
                            {cartItem.item.name}
                          </div>
                          {cartItem.customizations && (
                            <div className="text-xs text-gray-500 mt-1 space-y-0.5">
                              {cartItem.customizations.spiceLevel && (
                                <div>Spice: {cartItem.customizations.spiceLevel.charAt(0).toUpperCase() + cartItem.customizations.spiceLevel.slice(1)}</div>
                              )}
                              {cartItem.customizations.other && cartItem.customizations.other.length > 0 && (
                                <div>{cartItem.customizations.other.join(', ')}</div>
                              )}
                              {cartItem.customizations.addOns && cartItem.customizations.addOns.length > 0 && (
                                <div>Add-ons: {cartItem.customizations.addOns.join(', ')}</div>
                              )}
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <button
                            onClick={() => onUpdateQuantity(cartItem.item.id, -1)}
                            className="text-gray-500 hover:text-gray-700 font-bold"
                          >
                            −
                          </button>
                          <span className="text-gray-700 font-semibold w-8 text-center">
                            {cartItem.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(cartItem.item.id, 1)}
                            className="text-gray-500 hover:text-gray-700 font-bold"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            <div className="border-t border-gray-200 pt-4 flex-shrink-0">
              <div className="bg-blue-600 text-white rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-semibold">{totalItems} items</span>
                  <span className="text-2xl font-bold">${totalPrice.toFixed(2)}</span>
                </div>
                <button
                  onClick={onCheckout}
                  className="w-full bg-white text-blue-600 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={cart.length === 0}
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ingredient Overlay - Only shows while holding */}
      {showIngredientOverlay && selectedItemForOverlay && isHolding && (
        <IngredientOverlay
          item={selectedItemForOverlay}
          onClose={() => {
            setShowIngredientOverlay(false);
            setSelectedItemForOverlay(null);
            setIsHolding(false);
          }}
        />
      )}

      {/* Confirmation Dialog */}
      {showConfirmDialog && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-8"
          onClick={() => setShowConfirmDialog(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-md w-full p-8 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Are you sure?</h3>
            <p className="text-gray-600 mb-6">
              Your current order and progress will be lost. Do you want to go back to the splash screen?
            </p>
            <div className="flex gap-4 justify-end">
              <button
                onClick={() => setShowConfirmDialog(false)}
                className="px-6 py-3 bg-gray-200 text-gray-800 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowConfirmDialog(false);
                  onBackToSplash();
                }}
                className="px-6 py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-colors"
              >
                Yes, Go Back
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuScreen;

