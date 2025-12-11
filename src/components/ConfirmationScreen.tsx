import React from 'react';
import { CartItem } from '../types';

interface ConfirmationScreenProps {
  cart: CartItem[];
  onStartNewOrder: () => void;
}

const ConfirmationScreen: React.FC<ConfirmationScreenProps> = ({ cart, onStartNewOrder }) => {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-8">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-12 text-center">
        <div className="mb-8">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-12 h-12 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Order Confirmed!</h1>
          <p className="text-xl text-gray-600">Thank you for your order</p>
        </div>

        <div className="bg-gray-50 rounded-2xl p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Order Summary</h2>
          <div className="space-y-3 mb-6">
            {cart.map((cartItem) => (
              <div
                key={cartItem.item.id}
                className="flex items-center justify-between bg-white rounded-lg p-4"
              >
                <div className="flex-1 text-left">
                  <span className="font-semibold text-gray-800">{cartItem.item.name}</span>
                  {cartItem.customizations && (
                    <div className="text-sm text-gray-500 mt-1">
                      {cartItem.customizations.spiceLevel && (
                        <span>Spice: {cartItem.customizations.spiceLevel}</span>
                      )}
                      {cartItem.customizations.other && cartItem.customizations.other.length > 0 && (
                        <span className="ml-2">
                          {cartItem.customizations.other.join(', ')}
                        </span>
                      )}
                    </div>
                  )}
                </div>
                <div className="text-right">
                  <div className="font-semibold text-gray-800">
                    {cartItem.quantity} × ${cartItem.item.price.toFixed(2)}
                  </div>
                  <div className="text-gray-600">
                    ${(cartItem.quantity * cartItem.item.price).toFixed(2)}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-300 pt-4">
            <div className="flex items-center justify-between">
              <span className="text-xl font-semibold text-gray-800">Total ({totalItems} items)</span>
              <span className="text-2xl font-bold text-gray-800">${totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <button
          onClick={onStartNewOrder}
          className="bg-blue-600 text-white px-12 py-4 rounded-full text-xl font-semibold hover:bg-blue-700 transition-colors"
        >
          Start New Order
        </button>
      </div>
    </div>
  );
};

export default ConfirmationScreen;

