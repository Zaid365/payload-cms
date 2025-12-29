
import React, { useState } from 'react';
import Layout from './components/Layout';
import Hero from './components/Hero';
import Features from './components/Features';
import Pricing from './components/Pricing';
import TechStack from './components/TechStack';
import GeminiAssistant from './components/GeminiAssistant';
import RegistrationModal from './components/RegistrationModal';

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <Layout onOpenModal={openModal}>
      <Hero onOpenModal={openModal} />
      <Features />
      <TechStack />
      <GeminiAssistant />
      <Pricing onOpenModal={openModal} />
      
      <RegistrationModal isOpen={isModalOpen} onClose={closeModal} />
    </Layout>
  );
};

export default App;
