import React from 'react';
import SmartBusAcesso from './SmartBusAcesso';
import SmartBusHome from './SmartBusHome';

export default function SmartBusPrototipo() {
  return (
    <div
      style={{
        display: 'flex',
        gap: '20px',
        justifyContent: 'center',
        flexWrap: 'wrap',
        padding: '20px',
      }}
    >
      <div>
        <SmartBusAcesso />
      </div>

      <div>
        <SmartBusHome />
      </div>
    </div>
  );
}