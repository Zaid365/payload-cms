
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Hero from './components/Hero';
import Features from './components/Features';
import Pricing from './components/Pricing';
import TechStack from './components/TechStack';
import GeminiAssistant from './components/GeminiAssistant';
import RegistrationModal from './components/RegistrationModal';
import AuthModal from './components/AuthModal';
import Dashboard from './components/Dashboard';
import { auth } from './services/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

type View = 'landing' | 'dashboard';

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [user, setUser] = useState<{name: string, email: string} | null>(null);
  const [currentView, setCurrentView] = useState<View>('landing');
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    // Listen for real-time Firebase Auth changes
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        // User is logged in
        setUser({
          name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'User',
          email: firebaseUser.email || ''
        });
      } else {
        // User is logged out
        setUser(null);
        setCurrentView('landing');
      }
      setInitializing(false);
    });

    return () => unsubscribe();
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  
  const openAuth = () => setIsAuthOpen(true);
  const closeAuth = () => setIsAuthOpen(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const navigateToDashboard = () => {
    if (user) {
      setCurrentView('dashboard');
    } else {
      openAuth();
    }
  };

  const navigateToHome = () => setCurrentView('landing');

  if (initializing) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-400 font-medium animate-pulse">Initializing PayloadX...</p>
        </div>
      </div>
    );
  }

  return (
    <Layout 
      onOpenModal={openModal} 
      onOpenAuth={openAuth} 
      user={user} 
      onLogout={handleLogout}
      onNavigateDashboard={navigateToDashboard}
      onNavigateHome={navigateToHome}
      currentView={currentView}
    >
      {currentView === 'landing' ? (
        <>
          <Hero onOpenModal={user ? navigateToDashboard : openModal} isLoggedIn={!!user} />
          <Features />
          <TechStack />
          <GeminiAssistant />
          <Pricing onOpenModal={user ? navigateToDashboard : openModal} />
        </>
      ) : (
        <Dashboard user={user!} />
      )}
      
      <RegistrationModal isOpen={isModalOpen} onClose={closeModal} />
      <AuthModal 
        isOpen={isAuthOpen} 
        onClose={closeAuth} 
      />
    </Layout>
  );
};

export default App;
