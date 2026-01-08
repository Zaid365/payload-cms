
import React, { useState } from 'react';
import Layout from './components/Layout';
import Hero from './components/Hero';
import Features from './components/Features';
import Pricing from './components/Pricing';
import TechStack from './components/TechStack';
import GeminiAssistant from './components/GeminiAssistant';
import RegistrationModal from './components/RegistrationModal';
import AuthModal from './components/AuthModal';

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  
  const openAuth = () => setIsAuthOpen(true);
  const closeAuth = () => setIsAuthOpen(false);

  return (
    <Layout onOpenModal={openModal} onOpenAuth={openAuth}>
      <Hero onOpenModal={openModal} />
      <Features />
      <TechStack />
      <GeminiAssistant />
      <Pricing onOpenModal={openModal} />
      
      <RegistrationModal isOpen={isModalOpen} onClose={closeModal} />
      <AuthModal isOpen={isAuthOpen} onClose={closeAuth} />
    </Layout>
  );
};

export default App;
