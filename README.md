# Aarka Kiosk Application

A modern, interactive food ordering kiosk application for the Aarka Indian restaurant.

## Features

- **Welcome Screen**: Select dine-in or take-out, set party size (adults/kids), and choose language
- **Menu Screen**: Browse menu categories, view items, and manage your order
- **Item Customization**: Customize items with spice levels and other options
- **Tap & Hold Feature**: Tap on items (especially Samosas) to view detailed ingredient and allergen information
- **Meal Progress Bar**: Visual indicator showing order progress (red to green) based on party size
- **Order Summary**: Real-time cart with item quantities and total price
- **Order Confirmation**: Final confirmation screen with order summary

## Technology Stack

- React 19
- TypeScript
- Tailwind CSS
- Create React App

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
```

## Project Structure

```
src/
├── components/          # React components
│   ├── WelcomeScreen.tsx
│   ├── MenuScreen.tsx
│   ├── CustomizeScreen.tsx
│   ├── OrderCompleteScreen.tsx
│   ├── ConfirmationScreen.tsx
│   └── IngredientOverlay.tsx
├── data/               # Menu data
│   └── menuData.ts
├── types.ts            # TypeScript type definitions
├── App.tsx             # Main application component
└── index.css           # Global styles with Tailwind
```

## Key Features Explained

### Tap & Hold for Details
- Click/tap on food item images to view detailed ingredient and allergen information
- Currently implemented for Samosas with full ingredient list and allergen warnings
- Other items can be extended with similar detail overlays

### Meal Progress Bar
- Calculates progress based on party size (adults + kids)
- Target: ~1.8 items per person for a complete meal
- Color transitions from red (not enough) to yellow (getting there) to green (sufficient)

### Menu Categories
- Appetizers
- Tandoori
- Vegetable Entrees
- Meat Curries
- Seafood
- Biryanis
- Accompaniments
- Bread
- Desserts
- Beverages
- Specials

## Notes

- Images are displayed as placeholder gray boxes with "Food Image" text when no image URL is provided
- All state management is client-side (no backend required)
- Optimized for kiosk/tablet screens (~1440×900)
