import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <span className="logo-icon">🎓</span>
          <h1>AI Tutor</h1>
        </div>
        <p className="tagline">Your Personal Learning Assistant</p>
      </div>
    </header>
  );
};

export default Header;