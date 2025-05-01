import React, { useState } from 'react';
import {QRCodeSVG} from 'qrcode.react';

const QRCodeGenerator = () => {
  const [roomNumber, setRoomNumber] = useState('101');
//   const url = `http://localhost:5173/?roomNumber=${roomNumber}`;
  const url = `http://localhost:5173/?roomNumber=112`;

  return (
    <div style={{ textAlign: 'center' ,position: 'relative', zIndex: 2}}>
      <h2>QR Code for Room {roomNumber}</h2>
      <QRCodeSVG  value={url} />
      {/* <div style={{ marginTop: '20px' }}>
        <input
          type="text"
          value={roomNumber}
          onChange={(e) => setRoomNumber(e.target.value)}
          placeholder="Enter room number"
        />
      </div> */}
    </div>
  );
};

export default QRCodeGenerator;
