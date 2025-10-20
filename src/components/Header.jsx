import { useState, useEffect } from 'react';
import './Header.css';

function Header({ status, theme, onThemeToggle }) {
  const [onlineCount, setOnlineCount] = useState(2847);

  useEffect(() => {
    const interval = setInterval(() => {
      setOnlineCount(prev => {
        const change = Math.floor(Math.random() * 21) - 10; // -10 to +10
        const newCount = prev + change;
        return Math.max(1500, Math.min(5000, newCount)); // Keep between 1500-5000
      });
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const getStatusText = () => {
    switch(status) {
      case 'connected': return 'Connected';
      case 'waiting': return 'Looking for stranger...';
      default: return 'Disconnected';
    }
  };

  const getStatusColor = () => {
    switch(status) {
      case 'connected': return '#4ade80';
      case 'waiting': return '#fbbf24';
      default: return '#ef4444';
    }
  };

  return (
    <div className={`header ${theme}`}>
      <div className="header-left">
        <h1 className="header-title">
          <img src="./logo.png" alt="OopsChat Logo" style={{ height:"85px" }} />
        </h1>
        <div className="online-counter">
          <div className="online-dot"></div>
          <span className="online-count">{onlineCount.toLocaleString()}</span>
          <span>online</span>
        </div>
      </div>

      <div className="header-right">
        <div className="status-container">
          <div 
            className="status-dot" 
            style={{ background: getStatusColor() }}
          ></div>
          <span className="status-text">{getStatusText()}</span>
        </div>

        <button 
          className="theme-toggle" 
          onClick={onThemeToggle}
          aria-label="Toggle theme"
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>
    </div>
  );
}

export default Header;