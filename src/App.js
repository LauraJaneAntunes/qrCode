import React, { useState } from 'react';

// Função para gerar hash simples
const generateHash = (data) => {
  let hash = 0;
  const str = JSON.stringify(data) + Date.now().toString();
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash).toString(16);
};

// Função para gerar QR Code usando uma API pública
const generateQRCode = (data) => {
  const jsonString = JSON.stringify(data);
  const encodedData = encodeURIComponent(jsonString);
  return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodedData}`;
};

export default function QRGenerator() {
  const [pontos, setPontos] = useState('');
  const [qrData, setQrData] = useState(null);
  const [qrImageUrl, setQrImageUrl] = useState('');

  const handleGenerate = () => {
    if (!pontos || isNaN(pontos)) {
      alert('Por favor, insira um número válido de pontos');
      return;
    }

    const pontosNumber = parseInt(pontos);
    const hash = generateHash({ pontos: pontosNumber });
    
    const data = {
      pontos: pontosNumber,
      hash: hash
    };

    setQrData(data);
    setQrImageUrl(generateQRCode(data));
  };

  const handleClear = () => {
    setPontos('');
    setQrData(null);
    setQrImageUrl('');
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        maxWidth: '500px',
        margin: '0 auto',
        backgroundColor: 'white',
        borderRadius: '15px',
        padding: '30px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
      }}>
        <h1 style={{
          textAlign: 'center',
          color: '#333',
          marginBottom: '30px',
          fontSize: '28px'
        }}>
          Gerador de QR Code
        </h1>

        <div style={{ marginBottom: '25px' }}>
          <label style={{
            display: 'block',
            marginBottom: '8px',
            color: '#555',
            fontWeight: 'bold',
            fontSize: '16px'
          }}>
            Pontos:
          </label>
          <input
            type="number"
            value={pontos}
            onChange={(e) => setPontos(e.target.value)}
            placeholder="Digite o número de pontos"
            style={{
              width: '100%',
              padding: '12px',
              border: '2px solid #ddd',
              borderRadius: '8px',
              fontSize: '16px',
              boxSizing: 'border-box',
              transition: 'border-color 0.3s ease'
            }}
            onFocus={(e) => e.target.style.borderColor = '#667eea'}
            onBlur={(e) => e.target.style.borderColor = '#ddd'}
          />
        </div>

        <div style={{
          display: 'flex',
          gap: '10px',
          marginBottom: '30px'
        }}>
          <button
            onClick={handleGenerate}
            style={{
              flex: 1,
              padding: '12px 20px',
              backgroundColor: '#667eea',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#5a6fd8'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#667eea'}
          >
            Gerar QR Code
          </button>
          
          <button
            onClick={handleClear}
            style={{
              flex: 1,
              padding: '12px 20px',
              backgroundColor: '#e74c3c',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#c0392b'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#e74c3c'}
          >
            Limpar
          </button>
        </div>

        {qrImageUrl && (
          <div style={{
            textAlign: 'center',
            padding: '20px',
            backgroundColor: '#f8f9fa',
            borderRadius: '10px',
            border: '2px dashed #ddd'
          }}>
            <h3 style={{
              color: '#333',
              marginBottom: '15px'
            }}>
              QR Code Gerado
            </h3>
            
            <div style={{
              display: 'inline-block',
              padding: '15px',
              backgroundColor: 'white',
              borderRadius: '10px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
            }}>
              <img 
                src={qrImageUrl} 
                alt="QR Code gerado"
                style={{
                  display: 'block',
                  maxWidth: '200px',
                  height: 'auto'
                }}
              />
            </div>

            <div style={{
              marginTop: '15px',
              padding: '10px',
              backgroundColor: 'white',
              borderRadius: '8px',
              border: '1px solid #eee'
            }}>
              <p style={{
                margin: '0',
                color: '#666',
                fontSize: '14px'
              }}>
                <strong>Dados do QR Code:</strong>
              </p>
              <p style={{
                margin: '5px 0 0 0',
                color: '#333',
                fontSize: '16px',
                fontWeight: 'bold'
              }}>
                Pontos: {qrData.pontos}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}