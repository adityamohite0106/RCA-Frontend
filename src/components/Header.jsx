import './Header.css';

function Header({ status }) {
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
    <div className="header">
             <h1 className="header-title">
        <img src="./logo.png" alt="OopsChat Logo" style={{ height:"85px" }} />
       </h1>
      <div className="status-container">

       
        <div 
        
          className="status-dot" 
          style={{ background: getStatusColor() }}
        >


        </div>

        
        <span className="status-text">{getStatusText()}</span>
      </div>
    </div>
  );
}

export default Header;