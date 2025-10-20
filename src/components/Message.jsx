import './Message.css';

function Message({ message }) {
  return (
    <div className={`message message-${message.type}`}>
      <div className="message-bubble">
        {message.text}
      </div>
    </div>
  );
}

export default Message;