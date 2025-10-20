import { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import ChatArea from './components/ChatArea';
import MessageInput from './components/MessageInput';
import './App.css';

function App() {
  const [userId] = useState(() => {
    let id = sessionStorage.getItem('userId');
    if (!id) {
      id = 'user_' + Math.random().toString(36).substr(2, 9);
      sessionStorage.setItem('userId', id);
    }
    return id;
  });

  const [ws, setWs] = useState(null);
  const [status, setStatus] = useState('disconnected');
  const [messages, setMessages] = useState([]);
  const [partnerTyping, setPartnerTyping] = useState(false);
  const typingTimeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, [ws]);

  const connect = () => {
const websocket = new WebSocket('wss://rca-backend-pho0.onrender.com');
    
    websocket.onopen = () => {
      websocket.send(JSON.stringify({ type: 'join', userId }));
      setStatus('waiting');
    };

    websocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      
      switch(data.type) {
        case 'waiting':
          setStatus('waiting');
          setMessages([]);
          break;
        case 'matched':
          setStatus('connected');
          setMessages([{ type: 'system', text: 'Connected to a stranger! Say hi 👋' }]);
          break;
        case 'message':
          setMessages(prev => [...prev, { type: 'received', text: data.message }]);
          setPartnerTyping(false);
          break;
        case 'partner_disconnected':
          setStatus('disconnected');
          setMessages(prev => [...prev, { type: 'system', text: 'Stranger disconnected' }]);
          break;
        case 'typing':
          setPartnerTyping(true);
          if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
          typingTimeoutRef.current = setTimeout(() => setPartnerTyping(false), 1000);
          break;
      }
    };

    websocket.onclose = () => {
      setStatus('disconnected');
    };

    websocket.onerror = (error) => {
      console.error('WebSocket error:', error);
      setStatus('disconnected');
    };

    setWs(websocket);
  };

  const disconnect = () => {
    if (ws) {
      ws.close();
      setWs(null);
      setStatus('disconnected');
      setMessages([]);
    }
  };

  const findNext = () => {
    if (ws) {
      ws.send(JSON.stringify({ type: 'next' }));
      setStatus('waiting');
      setMessages([]);
    }
  };

  const sendMessage = (message) => {
    if (ws && status === 'connected') {
      ws.send(JSON.stringify({ type: 'message', message }));
      setMessages(prev => [...prev, { type: 'sent', text: message }]);
    }
  };

  const handleTyping = () => {
    if (ws && status === 'connected') {
      ws.send(JSON.stringify({ type: 'typing' }));
    }
  };

  return (
    <div className="app">
      <div className="chat-container">
        <Header status={status} />
        
        <ChatArea 
          messages={messages} 
          status={status} 
          partnerTyping={partnerTyping}
          onStart={connect}
          onNext={findNext}
          onStop={disconnect}
        />
        
        <MessageInput 
          onSend={sendMessage}
          onTyping={handleTyping}
          disabled={status !== 'connected'}
        />
      </div>
    </div>
  );
}

export default App;