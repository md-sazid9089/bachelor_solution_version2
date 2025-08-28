import React from 'react';

const MapSection = ({ id }) => {
  return (
    <section id={id} className="section map-section">
      <div className="container">
        <div className="map-container" style={{ width: '600px', height: '400px', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.08)', position: 'relative' }}>
          <iframe
            className="embed-map-frame"
            frameBorder="0"
            scrolling="no"
            marginHeight="0"
            marginWidth="0"
            src="https://maps.google.com/maps?width=600&height=400&hl=en&q=bangaldesh&t=&z=14&ie=UTF8&iwloc=B&output=embed"
            width="600"
            height="400"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Map Bangladesh"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default MapSection;