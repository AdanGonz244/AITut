import React from 'react';

const LoadingIndicator: React.FC = () => {
  return (
    <div className="message-bubble ai loading">
      <div className="message-content">
        <div className="loading-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div className="message-avatar">
        🎓
      </div>
    </div>
  );
};

export default LoadingIndicator;