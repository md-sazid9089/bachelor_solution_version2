import { useCarbonFootprint } from 'react-carbon-footprint';

const CarbonFootprintDisplay = ({ onClose, position }) => {
  const [gCO2, bytesTransferred] = useCarbonFootprint();

  const sideStyle =
    position === 'left'
      ? { left: 20, right: 'auto' }
      : { right: 20, left: 'auto' };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 70,
        ...sideStyle,
        background: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
        padding: '16px',
        borderRadius: '8px',
        zIndex: 1200,
        boxShadow: '0 2px 12px rgba(0,0,0,0.15)',
        minWidth: 260,
        maxWidth: 320,
        color: '#111',
      }}
    >
      <button
        onClick={onClose}
        style={{
          position: 'absolute',
          top: 8,
          right: 8,
          background: 'none',
          border: 'none',
          fontSize: 18,
          cursor: 'pointer',
          color: '#888',
        }}
        aria-label="Close"
      >
        ×
      </button>
      <h3 style={{ marginTop: 0 }}>Network Carbon Footprint</h3>
      <p>Bytes Transferred: {bytesTransferred} bytes</p>
      <p>CO2 Emissions: {gCO2 ? gCO2.toFixed(2) : '0.00'} grams CO2eq</p>
      <p style={{ fontSize: '0.8em', color: '#666' }}>
        (Estimates based on network data transfer during this session)
      </p>
    </div>
  );
};

export default CarbonFootprintDisplay;
