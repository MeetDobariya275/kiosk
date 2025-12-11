import React from 'react';
import { CartItem, PartySize, MenuItem } from '../types';
import { menuItems } from '../data/menuData';

interface OrderCompleteScreenProps {
  cart: CartItem[];
  partySize: PartySize;
  onAddItem: (item: MenuItem) => void;
  onOrder: () => void;
  onBackToMenu: () => void;
  onUpdateQuantity: (itemId: string, delta: number) => void;
}

const OrderCompleteScreen: React.FC<OrderCompleteScreenProps> = ({ 
  cart, 
  partySize, 
  onAddItem, 
  onOrder, 
  onBackToMenu, 
  onUpdateQuantity 
}) => {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.item.price * item.quantity, 0);
  const targetPeople = partySize.adults + partySize.kids;
  // Target: ~1.5-2 items per person for a good meal
  const targetItemsPerPerson = 1.8;
  const targetItems = Math.max(targetPeople, 1) * targetItemsPerPerson;
  const progress = Math.min(totalItems / targetItems, 1);
  const progressPercentage = Math.min(progress * 100, 100);

  // Determine progress bar color (red to green)
  const getProgressColor = () => {
    if (progress < 0.33) return 'bg-red-500';
    if (progress < 0.66) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  // Suggested items (sides and drinks)
  const suggestedItems = menuItems.filter(item => 
    item.category === 'Beverages' || item.category === 'Accompaniments' || item.category === 'Bread'
  ).slice(0, 6);

  return (
    <div className="h-screen bg-gray-100 flex flex-col overflow-hidden">
      {/* Header - Fixed */}
      <div className="bg-white shadow-sm flex-shrink-0 z-10">
        <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
          <h1 className="text-4xl font-serif text-gray-800">Aarka</h1>
          <div className="flex-1 max-w-md mx-8">
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
        </div>
      </div>

      {/* Main Content - Flex container */}
      <div className="flex-1 flex gap-6 px-8 py-6 overflow-hidden max-w-7xl mx-auto w-full">
        {/* Left Side - Suggestions */}
        <div className="flex-1 overflow-y-auto">
          <div className="bg-white rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Complete Your Order With...</h2>
            
            <div className="grid grid-cols-3 gap-4">
              {suggestedItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col border border-gray-200"
                  onClick={() => onAddItem(item)}
                >
                  <div className="relative w-full h-56 bg-gray-200 flex items-center justify-center flex-shrink-0">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-gray-400">Food Image</span>
                    )}
                  </div>
                  <div className="p-4 text-center flex-1 flex flex-col justify-center">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{item.name}</h3>
                    <span className="bg-gray-100 text-gray-700 px-4 py-1 rounded-full font-semibold inline-block">
                      ${item.price.toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar - Order Summary - Fixed */}
        <div className="w-80 flex-shrink-0">
          <div className="bg-white rounded-2xl p-6 shadow-sm h-full flex flex-col">
            <button 
              onClick={onBackToMenu}
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold mb-6 hover:bg-blue-700 transition-colors flex-shrink-0"
            >
              Menu
            </button>
            
            {/* Scrollable Item List */}
            <div className="flex-1 overflow-y-auto mb-4">
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
            </div>

            {/* Meal Progress Bar - Fixed */}
            <div className="mb-4 flex-shrink-0">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-gray-700">Meal Progress</span>
                <span className="text-xs text-gray-500">{Math.round(progressPercentage)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 ${getProgressColor()}`}
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>

            {/* Checkout Box - Fixed at Bottom */}
            <div className="bg-blue-600 text-white rounded-xl p-4 flex-shrink-0">
              <div className="flex items-center justify-between mb-3">
                <span className="font-semibold">{totalItems} items</span>
                <span className="text-2xl font-bold">${totalPrice.toFixed(2)}</span>
              </div>
              <button
                onClick={onOrder}
                className="w-full bg-white text-blue-600 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-colors"
              >
                Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCompleteScreen;
