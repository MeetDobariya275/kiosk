import React from 'react';
import { OrderType, Language, PartySize } from '../types';

interface WelcomeScreenProps {
  orderType: OrderType | null;
  partySize: PartySize;
  language: Language;
  onOrderTypeSelect: (type: OrderType) => void;
  onPartySizeChange: (partySize: PartySize) => void;
  onLanguageChange: (lang: Language) => void;
  onContinue: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  orderType,
  partySize,
  language,
  onOrderTypeSelect,
  onPartySizeChange,
  onLanguageChange,
  onContinue,
}) => {
  const updatePartySize = (field: 'adults' | 'kids', delta: number) => {
    const newValue = Math.max(0, partySize[field] + delta);
    onPartySizeChange({ ...partySize, [field]: newValue });
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-8">
      <div className="bg-white rounded-3xl w-full max-w-4xl p-12">
        {/* Welcome Title */}
        <h1 className="text-5xl font-serif text-blue-600 text-center mb-12">
          Welcome To Aarka
        </h1>

        {/* Order Type Selection */}
        <div className="flex justify-center gap-12 mb-16">
          <div className="flex flex-col items-center">
            <button
              onClick={() => onOrderTypeSelect('dine-in')}
              className={`w-32 h-32 rounded-2xl flex items-center justify-center transition-colors ${
                orderType === 'dine-in'
                  ? 'bg-blue-600 shadow-lg'
                  : 'bg-blue-100 hover:bg-blue-200'
              }`}
            >
              <svg
                className="w-16 h-16 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                />
              </svg>
            </button>
            <p className="mt-4 text-xl font-semibold text-black">Dine In</p>
          </div>

          <div className="flex flex-col items-center">
            <button
              onClick={() => onOrderTypeSelect('take-out')}
              className={`w-32 h-32 rounded-2xl flex items-center justify-center transition-colors ${
                orderType === 'take-out'
                  ? 'bg-blue-600 shadow-lg'
                  : 'bg-blue-100 hover:bg-blue-200'
              }`}
            >
              <svg
                className="w-16 h-16 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </button>
            <p className="mt-4 text-xl font-semibold text-black">Take Out</p>
          </div>
        </div>

        {/* Party Size */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">Who's Ordering Today?</h2>
          
          <div className="flex justify-center gap-16">
            {/* Adults Counter */}
            <div className="flex flex-col items-center">
              <label className="text-lg mb-4 text-gray-700">Adults</label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => updatePartySize('adults', -1)}
                  className="w-12 h-12 rounded-lg bg-blue-600 text-white text-2xl font-bold hover:bg-blue-700 transition-colors"
                >
                  −
                </button>
                <div className="w-20 h-12 bg-white border-2 border-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-2xl font-bold text-black">{partySize.adults}</span>
                </div>
                <button
                  onClick={() => updatePartySize('adults', 1)}
                  className="w-12 h-12 rounded-lg bg-blue-600 text-white text-2xl font-bold hover:bg-blue-700 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Kids Counter */}
            <div className="flex flex-col items-center">
              <label className="text-lg mb-4 text-gray-700">Kids</label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => updatePartySize('kids', -1)}
                  className="w-12 h-12 rounded-lg bg-blue-600 text-white text-2xl font-bold hover:bg-blue-700 transition-colors"
                >
                  −
                </button>
                <div className="w-20 h-12 bg-white border-2 border-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-2xl font-bold text-black">{partySize.kids}</span>
                </div>
                <button
                  onClick={() => updatePartySize('kids', 1)}
                  className="w-12 h-12 rounded-lg bg-blue-600 text-white text-2xl font-bold hover:bg-blue-700 transition-colors"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Menu Button - Always reserve space */}
        <div className="flex justify-center mb-8 h-16">
          {orderType && (
            <button
              onClick={onContinue}
              className="bg-blue-600 text-white px-12 py-4 rounded-full text-xl font-semibold hover:bg-blue-700 transition-colors flex items-center gap-3"
            >
              Menu
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          )}
        </div>

        {/* Language Selection */}
        <div className="flex justify-end gap-3">
          <button
            onClick={() => onLanguageChange('spanish')}
            className={`px-6 py-2 rounded-full text-sm font-semibold transition-colors ${
              language === 'spanish'
                ? 'bg-blue-600 text-white'
                : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
            }`}
          >
            Spanish
          </button>
          <button
            onClick={() => onLanguageChange('english')}
            className={`px-6 py-2 rounded-full text-sm font-semibold transition-colors ${
              language === 'english'
                ? 'bg-blue-600 text-white'
                : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
            }`}
          >
            English
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;

