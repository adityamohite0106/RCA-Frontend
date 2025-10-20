import { useEffect, useRef } from 'react';
import Message from './Message';
import './ChatArea.css';

function ChatArea({ messages, status, partnerTyping, onStart, onNext, onStop }) {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, partnerTyping]);

  return (
    <div className="chat-area">
      {status === 'disconnected' && messages.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">💬</div>
          <p className="empty-title">Start chatting with strangers</p>
          <p className="empty-subtitle">Connect anonymously with random people worldwide</p>
          <button className="btn btn-primary" onClick={onStart}>
            Start Chat
          </button>
        </div>
      ) : (
        <>
          <div className="messages-container">
            {messages.map((msg, index) => (
              <Message key={index} message={msg} />
            ))}
            
            {partnerTyping && (
              <div className="typing-indicator">
                <span>Stranger is typing</span>
                <div className="typing-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          <div className="chat-controls">
            {status === 'connected' && (
              <button className="btn btn-secondary" onClick={onNext}>
                Next
              </button>
            )}
            <button className="btn btn-danger" onClick={onStop}>
              Stop
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default ChatArea;