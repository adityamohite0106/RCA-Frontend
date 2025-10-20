import './Message.css';

function Message({ message, theme }) {
  return (
    <div className={`message message-${message.type} ${theme}`}>
      <div className="message-bubble">
        {message.text}
      </div>
    </div>
  );
}

export default Message;