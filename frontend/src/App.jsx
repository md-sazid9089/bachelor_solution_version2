import React, { useState, useEffect } from 'react';
import Header from '../../../project/src/components/Header';
import HousingSection from '../../../project/src/components/sections/HousingSection';
import ShopsSection from '../../../project/src/components/sections/ShopsSection';
import MaidSection from '../../../project/src/components/sections/MaidSection';
import MapSection from '../../../project/src/components/sections/MapSection';
import ExpenseCalculatorSection from '../../../project/src/components/sections/ExpenseCalculatorSection';
import ContactSection from '../../../project/src/components/sections/ContactSection';
import GetStartedSection from '../../../project/src/components/sections/GetStartedSection';
import ProfileSection from '../../../project/src/components/sections/ProfileSection';
import LoginModal from '../../../project/src/components/modals/LoginModal';
import Footer from '../../../project/src/components/Footer';
import './styles/components.css';
import './styles/utilities.css';

function App() {
  const [activeSection, setActiveSection] = useState('housing');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('bachelorSolutionUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
    setIsLoginModalOpen(false);
    localStorage.setItem('bachelorSolutionUser', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('bachelorSolutionUser');
    setActiveSection('housing');
  };

  const handleRegister = (userData) => {
    handleLogin(userData);
  };

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="App">
      <Header
        activeSection={activeSection}
        onNavigate={scrollToSection}
        onLoginClick={() => setIsLoginModalOpen(true)}
        isLoggedIn={isLoggedIn}
        user={user}
        onLogout={handleLogout}
      />
      
      <main className="main-content">
        <HousingSection id="housing" />
        <ShopsSection id="shops" />
        <MaidSection id="maid" />
        <MapSection id="map" />
        <ExpenseCalculatorSection id="expense-calculator" />
        <ContactSection id="contact" />
        {isLoggedIn && <ProfileSection id="profile" user={user} />}
        <GetStartedSection id="get-started" onRegister={handleRegister} />
      </main>

      <Footer />

      {isLoginModalOpen && (
        <LoginModal
          onClose={() => setIsLoginModalOpen(false)}
          onLogin={handleLogin}
        />
      )}
    </div>
  );
}

export default App;