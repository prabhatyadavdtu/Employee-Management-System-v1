import React from 'react';

const Loader = () => (
  <div className="loader-overlay">
    <div className="apple-spinner">
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="apple-spinner-blade"
          style={{
            transform: `rotate(${i * 30}deg) translate(0, -40px)`, // Increased blade length
            animationDelay: `${i * 0.1}s`
          }}
        />
      ))}
    </div>
    <style>
      {`
      .loader-overlay {
        position: absolute;
        top: 0; left: 0; right: 0; bottom: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(255,255,255,0.6);
        z-index: 10;
      }
      .apple-spinner {
        position: relative;
        width: 100px;
        height: 100px;
        display: inline-block;
      }
      .apple-spinner-blade {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 10px;
        height: 60px; /* Larger blade length */
        border-radius: 5px;
        background: #2563eb; /* Blue color */
        opacity: 0.2;
        transform-origin: center bottom;
        animation: apple-spinner-fade 1.2s linear infinite;
      }
      @keyframes apple-spinner-fade {
        0%   { opacity: 1; }
        100% { opacity: 0.2; }
      }
      `}
    </style>
  </div>
);

export default Loader;