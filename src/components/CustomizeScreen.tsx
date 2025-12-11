import React, { useState } from 'react';
import { MenuItem, CartItem } from '../types';

interface CustomizeScreenProps {
  item: MenuItem;
  onAddToCart: (item: MenuItem, customizations: { spiceLevel?: 'mild' | 'medium' | 'spicy'; other?: string[]; addOns?: string[] }) => void;
  onCancel: () => void;
}

const CustomizeScreen: React.FC<CustomizeScreenProps> = ({ item, onAddToCart, onCancel }) => {
  const [spiceLevel, setSpiceLevel] = useState<'mild' | 'medium' | 'spicy'>('mild');
  const [otherOptions, setOtherOptions] = useState<string[]>([]);
  const [addOns, setAddOns] = useState<string[]>([]);

  // Sample add-ons - you can make this dynamic later
  const availableAddOns = ['Extra Sauce', 'Extra Spice', 'Side Salad', 'Extra Rice'];

  const toggleOtherOption = (option: string) => {
    setOtherOptions(prev =>
      prev.includes(option)
        ? prev.filter(o => o !== option)
        : [...prev, option]
    );
  };

  const toggleAddOn = (addOn: string) => {
    setAddOns(prev =>
      prev.includes(addOn)
        ? prev.filter(a => a !== addOn)
        : [...prev, addOn]
    );
  };

  const handleAddToCart = () => {
    onAddToCart(item, {
      spiceLevel: item.customizations?.spiceLevel ? spiceLevel : undefined,
      other: otherOptions.length > 0 ? otherOptions : undefined,
      addOns: addOns.length > 0 ? addOns : undefined,
    });
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-8"
      onClick={onCancel}
    >
      <div
        className="bg-white rounded-2xl max-w-5xl w-full relative border-l-4 border-r-4 border-black"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="grid grid-cols-2 gap-12 p-12">
          {/* Left Side - Image */}
          <div>
            <div className="w-full h-96 bg-gray-200 rounded-2xl mb-4 flex items-center justify-center">
              {item.image ? (
                <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-2xl" />
              ) : (
                <span className="text-gray-400">Food Image</span>
              )}
            </div>
            <h2 className="text-3xl font-bold text-gray-800">{item.name}</h2>
          </div>

          {/* Right Side - Customization Options */}
          <div className="space-y-8">
            {item.customizations?.spiceLevel && (
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Choose Spice Level</h3>
                <div className="flex gap-4">
                  {(['mild', 'medium', 'spicy'] as const).map((level) => (
                    <button
                      key={level}
                      onClick={() => setSpiceLevel(level)}
                      className={`flex-1 py-4 rounded-xl font-semibold transition-all shadow-sm ${
                        spiceLevel === level
                          ? 'bg-blue-600 text-white shadow-md'
                          : 'bg-blue-100 text-gray-700 hover:bg-blue-200'
                      }`}
                    >
                      {level.charAt(0).toUpperCase() + level.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {item.customizations?.other && item.customizations.other.length > 0 && (
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Other Customization</h3>
                <div className="space-y-3">
                  {item.customizations.other.map((option) => (
                    <button
                      key={option}
                      onClick={() => toggleOtherOption(option)}
                      className={`w-full py-4 rounded-xl font-semibold transition-all shadow-sm ${
                        otherOptions.includes(option)
                          ? 'bg-blue-600 text-white shadow-md'
                          : 'bg-blue-100 text-gray-700 hover:bg-blue-200'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Add Ons Section */}
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Add Ons</h3>
              <div className="space-y-3">
                {availableAddOns.map((addOn) => (
                  <button
                    key={addOn}
                    onClick={() => toggleAddOn(addOn)}
                    className={`w-full py-4 rounded-xl font-semibold transition-all shadow-sm ${
                      addOns.includes(addOn)
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-blue-100 text-gray-700 hover:bg-blue-200'
                    }`}
                  >
                    {addOn}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-center gap-4 pt-8">
              <button
                onClick={() => {
                  handleAddToCart();
                  onCancel();
                }}
                className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-sm"
              >
                Add To Order
              </button>
              <button
                onClick={onCancel}
                className="bg-gray-300 text-gray-800 px-8 py-3 rounded-xl font-semibold hover:bg-gray-400 transition-colors shadow-sm"
              >
                (×) Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomizeScreen;

