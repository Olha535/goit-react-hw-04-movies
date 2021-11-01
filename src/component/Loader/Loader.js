import React from 'react';
import Loader from 'react-loader-spinner';

export default function Spinner() {
  return (
    <div>
      <Loader
        type="ThreeDots"
        color="#00BFFF"
        height={80}
        width={80}
        timeout={3000}
        style={{ textAlign: 'center' }}
      />
    </div>
  );
}
