import React from 'react';

interface SplashScreenProps {
  onContinue: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onContinue }) => {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-8">
      <div 
        className="bg-aarka-light-blue rounded-3xl w-full max-w-5xl p-16 relative overflow-hidden cursor-pointer"
        onClick={onContinue}
      >
        {/* Background pattern - wavy lines */}
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" viewBox="0 0 400 400" preserveAspectRatio="none">
            <path
              d="M0,100 Q100,50 200,100 T400,100 L400,400 L0,400 Z"
              fill="none"
              stroke="#C0E0FF"
              strokeWidth="2"
            />
            <path
              d="M0,150 Q100,100 200,150 T400,150 L400,400 L0,400 Z"
              fill="none"
              stroke="#C0E0FF"
              strokeWidth="2"
            />
            <path
              d="M0,200 Q100,150 200,200 T400,200 L400,400 L0,400 Z"
              fill="none"
              stroke="#C0E0FF"
              strokeWidth="2"
            />
          </svg>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center">
          <h1 className="text-7xl md:text-8xl font-serif text-aarka-blue mb-6">
            Aarka
          </h1>
          <p className="text-2xl md:text-3xl font-sans text-aarka-blue tracking-wider uppercase">
            THE ESSENCE OF INDIAN FLAVOR
          </p>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;

