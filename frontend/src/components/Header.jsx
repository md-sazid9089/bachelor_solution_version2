import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faHome, faStore, faUserTie, faMapMarkerAlt, faCalculator, faPhone, faUser, faSignOutAlt, faHeartbeat } from '@fortawesome/free-solid-svg-icons';

const Header = ({
  activeSection,
  onNavigate,
  onLoginClick,
  isLoggedIn,
  user,
  onLogout
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Get background color based on active section - using housing page color for all
  const getSectionBackground = (section) => {
    // Use housing page gradient for all sections - matching CSS variables
    return 'linear-gradient(135deg, var(--primary-50) 0%, var(--secondary-50) 100%)';
  };

  const navItems = [
    { id: 'housing', label: 'Housing', icon: faHome },
    { id: 'shops', label: 'Shops', icon: faStore },
    { id: 'maid', label: 'Maid', icon: faUserTie },
    { id: 'map', label: 'Map', icon: faMapMarkerAlt },
    { id: 'expense-calculator', label: 'Calculator', icon: faCalculator },
    { id: 'hacks', label: 'Hacks', icon: faUserTie },
    { id: 'health', label: 'Health', icon: faHeartbeat },
  ];

  if (isLoggedIn) {
    navItems.push({ id: 'profile', label: 'Profile', icon: faUser });
  }

  const handleNavClick = (sectionId) => {
    onNavigate(sectionId);
    setIsMobileMenuOpen(false);
  };

  return (
    <header 
      className="header" 
      style={{ 
        background: getSectionBackground(activeSection)
      }}
    >
      <div className="header-container">
        <div className="logo">
          <h1>Bachelor Solution</h1>
        </div>

        <nav className={`nav ${isMobileMenuOpen ? 'nav-open' : ''}`}>
          <ul className="nav-list">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                  onClick={() => handleNavClick(item.id)}
                >
                  <FontAwesomeIcon icon={item.icon} />
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>

          <div className="nav-actions">
            {isLoggedIn ? (
              <div className="user-menu">
                <span className="welcome-text">Hi, {user?.name || 'User'}</span>
                <button className="logout-btn" onClick={onLogout}>
                  <FontAwesomeIcon icon={faSignOutAlt} />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <>
                <button className="login-btn" onClick={onLoginClick}>
                  Login
                </button>
                <button 
                  className="get-started-btn"
                  onClick={() => handleNavClick('get-started')}
                >
                  Get Started
                </button>
              </>
            )}
          </div>
        </nav>

        <button
          className="mobile-menu-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <FontAwesomeIcon icon={isMobileMenuOpen ? faTimes : faBars} />
        </button>
      </div>
    </header>
  );
};

export default Header;