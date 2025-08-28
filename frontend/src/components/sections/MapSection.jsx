import React from 'react';

const MapSection = ({ id }) => {
  return (
    <section id={id} className="section map-section">
      <div className="container">
        <div className="map-container" style={{ width: '100%', height: '500px', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
          <iframe
            title="Google Map"
            src="https://www.google.com/maps/@23.7535232,90.4101888,14z?entry=ttu&g_ep=EgoyMDI1MDgyNS4wIKXMDSoASAFQAw%3D%3D"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default MapSection;