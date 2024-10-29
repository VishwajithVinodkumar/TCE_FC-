import React from 'react';
import NavbarComponent from '../components/NavbarComponent';
import '../css/home.css';

export default function HomePage() {
  return (
    <>
      <NavbarComponent />
      
      <div className="container-home">
        <div className="header-home">
          <h1>Thiagarajar College of Engineering Food Court</h1>
          <p>Order delicious food from our college Canteen</p>
        </div>
        
        {/* Developer Credits */}
        <div className="credits">
          <p>Developed by Vishwajith, Naren, Karthik</p>
        </div>
      </div>
    </>
  );
}
