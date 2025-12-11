import React, { useState } from 'react';
import { AppState, Screen, OrderType, Language, PartySize, MenuItem, CartItem } from './types';
import { menuItems, categories } from './data/menuData';
import SplashScreen from './components/SplashScreen';
import WelcomeScreen from './components/WelcomeScreen';
import MenuScreen from './components/MenuScreen';
import CustomizeScreen from './components/CustomizeScreen';
import OrderCompleteScreen from './components/OrderCompleteScreen';
import ConfirmationScreen from './components/ConfirmationScreen';
import './App.css';

function App() {
  const [state, setState] = useState<AppState>({
    currentScreen: 'splash',
    orderType: null,
    partySize: { adults: 1, kids: 0 },
    language: 'english',
    cart: [],
    selectedItem: null,
    selectedCategory: categories[0],
    specialRequests: '',
  });

  const handleOrderTypeSelect = (type: OrderType) => {
    setState(prev => ({ ...prev, orderType: type }));
  };

  const handlePartySizeChange = (partySize: PartySize) => {
    setState(prev => ({ ...prev, partySize }));
  };

  const handleLanguageChange = (language: Language) => {
    setState(prev => ({ ...prev, language }));
  };

  const handleContinue = () => {
    if (state.orderType) {
      setState(prev => ({ ...prev, currentScreen: 'menu' }));
    }
  };

  const handleCategorySelect = (category: string) => {
    setState(prev => ({ ...prev, selectedCategory: category }));
  };

  const handleItemClick = (item: MenuItem) => {
    if (item.customizations) {
      setState(prev => ({ ...prev, selectedItem: item, currentScreen: 'customize' }));
    } else {
      // Add directly to cart if no customizations
      handleAddToCart(item);
    }
  };

  const handleAddToCart = (item: MenuItem, customizations?: { spiceLevel?: 'mild' | 'medium' | 'spicy'; other?: string[]; addOns?: string[] }, keepCurrentScreen?: boolean) => {
    setState(prev => {
      const existingItem = prev.cart.find(cartItem => 
        cartItem.item.id === item.id &&
        JSON.stringify(cartItem.customizations) === JSON.stringify(customizations)
      );

      const newScreen = keepCurrentScreen ? prev.currentScreen : 'menu';

      if (existingItem) {
        return {
          ...prev,
          cart: prev.cart.map(cartItem =>
            cartItem === existingItem
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem
          ),
          currentScreen: newScreen,
          selectedItem: null,
        };
      }

      return {
        ...prev,
        cart: [...prev.cart, {
          item,
          quantity: 1,
          customizations,
        }],
        currentScreen: newScreen,
        selectedItem: null,
      };
    });
  };

  const handleUpdateQuantity = (itemId: string, delta: number) => {
    setState(prev => ({
      ...prev,
      cart: prev.cart
        .map(cartItem =>
          cartItem.item.id === itemId
            ? { ...cartItem, quantity: Math.max(0, cartItem.quantity + delta) }
            : cartItem
        )
        .filter(cartItem => cartItem.quantity > 0),
    }));
  };

  const handleCheckout = () => {
    setState(prev => ({ ...prev, currentScreen: 'order-complete' }));
  };

  const handleOrder = () => {
    setState(prev => ({ ...prev, currentScreen: 'confirmation' }));
  };

  const handleStartNewOrder = () => {
    setState({
      currentScreen: 'splash',
      orderType: null,
      partySize: { adults: 1, kids: 0 },
      language: 'english',
      cart: [],
      selectedItem: null,
      selectedCategory: categories[0],
      specialRequests: '',
    });
  };

  const handleSplashContinue = () => {
    setState(prev => ({ ...prev, currentScreen: 'welcome' }));
  };

  const handleBackToSplash = () => {
    setState({
      currentScreen: 'splash',
      orderType: null,
      partySize: { adults: 1, kids: 0 },
      language: 'english',
      cart: [],
      selectedItem: null,
      selectedCategory: categories[0],
      specialRequests: '',
    });
  };

  const handleCancelCustomize = () => {
    setState(prev => ({ ...prev, currentScreen: 'menu', selectedItem: null }));
  };

  const renderScreen = () => {
    switch (state.currentScreen) {
      case 'splash':
        return (
          <SplashScreen onContinue={handleSplashContinue} />
        );

      case 'welcome':
        return (
          <WelcomeScreen
            orderType={state.orderType}
            partySize={state.partySize}
            language={state.language}
            onOrderTypeSelect={handleOrderTypeSelect}
            onPartySizeChange={handlePartySizeChange}
            onLanguageChange={handleLanguageChange}
            onContinue={handleContinue}
          />
        );

      case 'menu':
        return (
          <MenuScreen
            categories={categories}
            menuItems={menuItems}
            cart={state.cart}
            selectedCategory={state.selectedCategory}
            onCategorySelect={handleCategorySelect}
            onItemClick={handleItemClick}
            onAddToCart={handleAddToCart}
            onUpdateQuantity={handleUpdateQuantity}
            onCheckout={handleCheckout}
            onBackToSplash={handleBackToSplash}
          />
        );

      case 'customize':
        if (!state.selectedItem) return null;
        return (
          <>
            <MenuScreen
              categories={categories}
              menuItems={menuItems}
              cart={state.cart}
              selectedCategory={state.selectedCategory}
              onCategorySelect={handleCategorySelect}
              onItemClick={handleItemClick}
              onAddToCart={handleAddToCart}
              onUpdateQuantity={handleUpdateQuantity}
              onCheckout={handleCheckout}
              onBackToSplash={handleBackToSplash}
            />
            <CustomizeScreen
              item={state.selectedItem}
              onAddToCart={handleAddToCart}
              onCancel={handleCancelCustomize}
            />
          </>
        );

      case 'order-complete':
        return (
          <OrderCompleteScreen
            cart={state.cart}
            partySize={state.partySize}
            onAddItem={(item) => {
              handleAddToCart(item, undefined, true);
            }}
            onOrder={handleOrder}
            onBackToMenu={() => setState(prev => ({ ...prev, currentScreen: 'menu' }))}
            onUpdateQuantity={handleUpdateQuantity}
            specialRequests={state.specialRequests}
            onSpecialRequestsChange={(requests) => setState(prev => ({ ...prev, specialRequests: requests }))}
          />
        );

      case 'confirmation':
        return (
          <ConfirmationScreen
            cart={state.cart}
            onStartNewOrder={handleStartNewOrder}
            specialRequests={state.specialRequests}
          />
        );

      default:
        return null;
    }
  };

  return <div className="App">{renderScreen()}</div>;
}

export default App;
