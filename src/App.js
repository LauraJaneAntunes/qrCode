import React, { useState } from 'react';

// Cores e estilos baseados no tema Ecosrev
const theme = {
  colors: {
    primary: "#45C4B0",       // Cor principal (azul petróleo)
    contrastText: "#506266",  // Cor do texto (cinza azulado)
    secondary: "#9FC131",     // Cor secundária (verde)
    background: "#f0f2f5",    // Cor de fundo padrão (azul gelo)
    paper: "#ffffff",         // Cor de fundo para elementos (branco)
    hover: "#D6F5F1"          // Cor de hover
  },
  typography: {
    fontFamily: "'Poppins', sans-serif"
  }
};

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
    
    // Verificação para não permitir pontuação negativa ou zero
    if (pontosNumber <= 0) {
      alert('Por favor, insira um número de pontos maior que zero');
      return;
    }
    
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
  };  return (
    <div style={{
      minHeight: '100vh',
      background: `url('/images/loginImg.jpg')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      padding: '20px',
      fontFamily: theme.typography.fontFamily
    }}>
      <div style={{
        maxWidth: '500px',
        margin: '0 auto',
        backgroundColor: theme.colors.paper,
        borderRadius: '15px',
        padding: '30px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
      }}>        <div style={{
          textAlign: 'center',
          marginBottom: '20px'
        }}>          <img 
            src="/images/logo.svg" 
            alt="Logo Ecosrev" 
            style={{
              height: '180px',
              marginBottom: '10px'
            }}
          />
          <div style={{
            height: '3px',
            width: '80px',
            background: `linear-gradient(to right, ${theme.colors.primary}, ${theme.colors.secondary})`,
            margin: '0 auto'
          }}></div>
        </div>
        
        <h1 style={{
          textAlign: 'center',
          color: theme.colors.contrastText,
          marginBottom: '30px',
          fontSize: '24px'
        }}>
          Gerador de QR Code
        </h1>        <div style={{ 
          marginBottom: '25px',
          position: 'relative'
        }}>
          <label
            style={{
              display: 'block',
              marginBottom: '8px',
              fontSize: '14px',
              fontWeight: '500',
              color: theme.colors.primary,
              transition: 'color 0.2s ease',
              cursor: 'pointer'
            }}
            onClick={() => document.querySelector('input').focus()}
          >
            Pontos
          </label>
          <input
            type="number"
            value={pontos}
            onChange={(e) => setPontos(e.target.value)}
            placeholder="Digite o número de pontos"
            min="1"
            style={{
              width: '100%',
              padding: '12px',
              border: `1px solid ${pontos ? theme.colors.primary : '#e0e0e0'}`,
              borderRadius: '4px',
              fontSize: '16px',
              boxSizing: 'border-box',
              transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
              color: theme.colors.contrastText,
              outline: 'none',
              background: 'transparent'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = theme.colors.primary;
              e.target.style.borderWidth = '2px';
              e.target.style.boxShadow = `0 0 0 1px ${theme.colors.primary}15`;
              document.querySelector('label').style.color = theme.colors.primary;
            }}
            onBlur={(e) => {
              if (!pontos) {
                e.target.style.borderColor = '#e0e0e0';
                e.target.style.borderWidth = '1px';
                document.querySelector('label').style.color = '#757575';
              } else {
                e.target.style.borderColor = theme.colors.primary;
                e.target.style.borderWidth = '1px';
              }
              e.target.style.boxShadow = 'none';
            }}
          />
        </div>

        <div style={{
          display: 'flex',
          gap: '10px',
          marginBottom: '30px'
        }}>          <button
            onClick={handleGenerate}
            style={{
              flex: 1,
              padding: '12px 20px',
              backgroundColor: theme.colors.primary,
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
              outline: 'none' // Remove a borda preta ao clicar
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#38A898'}
            onMouseLeave={(e) => e.target.style.backgroundColor = theme.colors.primary}
            onFocus={(e) => e.target.style.outline = 'none'} // Garante que não tenha outline em navegadores diferentes
          >
            Gerar QR Code
          </button>
            <button
            onClick={handleClear}
            style={{
              flex: 1,
              padding: '12px 20px',
              backgroundColor: 'transparent',
              color: theme.colors.secondary,
              border: `2px solid ${theme.colors.secondary}`,
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: 'none'
            }}            
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = theme.colors.secondary + '10';
              e.target.style.borderColor = theme.colors.secondary;
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.borderColor = theme.colors.secondary;
            }}
          >
            Limpar
          </button>
        </div>        {qrImageUrl && (          <div style={{
            textAlign: 'center',
            padding: '20px',
            backgroundColor: theme.colors.hover,
            borderRadius: '10px',
            boxShadow: `0 3px 10px ${theme.colors.primary}20`,
            border: `1px solid ${theme.colors.primary}30`
          }}>
            <h3 style={{
              color: theme.colors.contrastText,
              marginBottom: '15px'
            }}>
              QR Code Gerado
            </h3>
            
            <div style={{
              display: 'inline-block',
              padding: '15px',
              backgroundColor: theme.colors.paper,
              borderRadius: '10px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
              border: `1px solid ${theme.colors.primary}30`
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
              padding: '15px',
              backgroundColor: theme.colors.paper,
              borderRadius: '8px',
              border: `1px solid ${theme.colors.primary}30`
            }}>
              <p style={{
                margin: '0',
                color: theme.colors.contrastText,
                fontSize: '14px'
              }}>
                <strong>Dados do QR Code:</strong>
              </p>
              <p style={{
                margin: '8px 0 0 0',
                color: theme.colors.primary,
                fontSize: '16px',
                fontWeight: 'bold'
              }}>
                Pontos: {qrData.pontos}
              </p>            </div>
          </div>
        )}
        
        <div style={{
          marginTop: '30px',
          textAlign: 'center',
          borderTop: `1px solid ${theme.colors.primary}20`,
          paddingTop: '20px'
        }}>
          <p style={{
            fontSize: '14px',
            color: theme.colors.contrastText,
            opacity: 0.7
          }}>
            © {new Date().getFullYear()} Ecosrev 
          </p>
        </div>
      </div>
    </div>
  );
}