import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HousingSection from './components/sections/HousingSection';
import ShopsSection from './components/sections/ShopsSection';
import MaidSection from './components/sections/MaidSection';
import MapSection from './components/sections/MapSection';
import ExpenseCalculatorSection from './components/sections/ExpenseCalculatorSection';
import ContactSection from './components/sections/ContactSection';
import BachelorHacksSection from './components/sections/BachelorHacksSection';
import HealthSection from './components/sections/HealthSection';
import GetStartedSection from './components/sections/GetStartedSection';
import ProfileSection from './components/sections/ProfileSection';
import LoginModal from './components/modals/LoginModal';
import AdminPanel from './components/admin/AdminPanel';
import Footer from './components/Footer';
import './styles/components.css';
import './styles/utilities.css';

function App() {
  const [activeSection, setActiveSection] = useState('housing');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState('main');

  useEffect(() => {
    const storedUser = localStorage.getItem('bachelorSolutionUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
    }

    // Check URL for admin route
    const path = window.location.pathname;
    if (path === '/admin') {
      setCurrentPage('admin');
    }

    // Handle back/forward navigation
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path === '/admin') {
        setCurrentPage('admin');
      } else {
        setCurrentPage('main');
      }
    };

    // Check for admin redirect in URL params
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('admin') === 'true') {
      setCurrentPage('admin');
      window.history.replaceState({}, document.title, '/admin');
    }

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
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
      {currentPage === 'admin' ? (
        <AdminPanel />
      ) : (
        <>
          <Header
            activeSection={activeSection}
            onNavigate={scrollToSection}
            onLoginClick={() => setIsLoginModalOpen(true)}
            isLoggedIn={isLoggedIn}
            user={user}
            onLogout={handleLogout}
          />
          
          <main className="main-content">
            <HousingSection id="housing" user={user} />
            <ShopsSection id="shops" />
            <MaidSection id="maid" />
            <MapSection id="map" />
            <ExpenseCalculatorSection id="expense-calculator" />
            <BachelorHacksSection id="hacks" user={user} />
            <HealthSection id="health" user={user} />
            <ContactSection id="contact" />
            {isLoggedIn && <ProfileSection id="profile" user={user} />}
            {!isLoggedIn && <GetStartedSection id="get-started" onRegister={handleRegister} />}
          </main>

          <Footer />

          {isLoginModalOpen && (
            <LoginModal
              onClose={() => setIsLoginModalOpen(false)}
              onLogin={handleLogin}
            />
          )}
        </>
      )}
    </div>
  );
}

export default App;