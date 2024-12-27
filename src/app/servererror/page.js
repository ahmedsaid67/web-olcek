import React from 'react';

const ServerError = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      backgroundColor: '#f8d7da', // Kırmızımsı pembe arka plan
      color: '#721c24', // Koyu kırmızı metin rengi
      textAlign: 'center',
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1>Sunucu Bakımda</h1>
      <p>Maalesef şu anda sunucumuz bakımdadır.</p>
      <p>Lütfen daha sonra tekrar deneyin.</p>
    </div>
  );
}

export default ServerError;
