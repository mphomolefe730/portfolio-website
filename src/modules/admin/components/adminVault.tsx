import { useState } from 'react';
import Papa from 'papaparse';
import { verifySuperUserPassword, encryptData, decryptData } from '../../../configs/vaultCrypto';
import { env } from '../../../configs/environment';

interface VaultItem {
  id: string;
  serviceName: string;
  encryptedPayload: string;
}

export default function AdminVault() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passInput, setPassInput] = useState('');
  const [activeKey, setActiveKey] = useState('');
  const [error, setError] = useState('');
  const [vaultItems, setVaultItems] = useState<VaultItem[]>([]);
  
  const [newService, setNewService] = useState('');
  const [newPlaintext, setNewPlaintext] = useState('');

  const [generatedServiceCipher, setGeneratedServiceCipher] = useState('');
  const [generatedPayloadCipher, setGeneratedPayloadCipher] = useState('');

  const handleGenerateEncryption = () => {
    if (!newService || !newPlaintext) return;
        
    const serviceCipher = encryptData(newService);
    const payloadCipher = encryptData(newPlaintext);
        
    setGeneratedServiceCipher(serviceCipher);
    setGeneratedPayloadCipher(payloadCipher);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (verifySuperUserPassword(passInput)) {
      setIsAuthenticated(true);
      setActiveKey(passInput);
      setError('');
      fetchVaultData();
    } else {
      setError('Invalid password or expired time token.');
    }
  };

  const fetchVaultData = async () => {
    try {
      const res = await fetch(env.GOOGLE_DRIVE_VAULT);
      const csvText = await res.text();
      const parsed = Papa.parse<any>(csvText, { header: true, skipEmptyLines: true }).data;
      console.log('Fetched Vault CSV:', parsed);
      
      setVaultItems(parsed.map((item: any) => ({
        id: item.ID || item.id,
        serviceName: item.Service || item.serviceName,
        encryptedPayload: item.EncryptedPayload || item.payload
      })));
    } catch (err) {
      console.error('Error loading vault CSV:', err);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="adminLoginContainer" style={{ maxWidth: '450px', margin: '40px auto' }}>
        <h2 className="company_name">SUPER USER VAULT</h2>
        <p style={{ fontSize: '12px', opacity: 0.7 }}>Enter your dynamic token to access the vault [mphohhmm]</p>
        <form onSubmit={handleLogin}>
          <div className="adminLoginField">
            <input
              type="password"
              className="inputTag"
              value={passInput}
              onChange={(e) => setPassInput(e.target.value)}
              placeholder="Enter password..."
            />
          </div>
          {error && <p className="error" style={{ color: 'red', margin: '0.05rem'}}>{error}</p>}
          <button type="submit" className="contactButton" style={{ marginTop: '15px' }}>
            VERIFY &amp; UNLOCK
          </button>
        </form>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '750px', margin: '0 auto', padding: '20px' }}>
      <h2 className="company_name">DECRYPTED VAULT</h2>
      <p style={{ fontSize: '12px', opacity: 0.7 }}>Unlocked with dynamic token: {activeKey}</p>

      <div style={{ display: 'grid', gap: '12px', marginTop: '20px' }}>
        {vaultItems.map((item) => {
            const decryptedService = decryptData(item.serviceName);
            const decryptedPayload = decryptData(item.encryptedPayload);
          return (
            <div
              key={item.id}
              style={{
                padding: '12px 16px',
                borderRadius: '8px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)'
              }}
            >
                <strong style={{ color: '#646cff' }}>
                    {decryptedService !== '<Failed to Decrypt>' ? decryptedService : 'Unknown Service'}
                </strong>
                <div style={{ fontFamily: 'monospace', marginTop: '6px', color: '#4caf50' }}>
                    {decryptedPayload !== '<Failed to Decrypt>' ? decryptedPayload : 'Encrypted Data Error'}
                </div>
            </div>
          );
        })}
      </div>

      {/* Encryption Helper Tool for Google Sheets updates */}
      <div style={{ marginTop: '30px', padding: '20px', borderRadius: '8px', background: 'rgba(0,0,0,0.2)' }}>
        <h4>Encrypt New Credentials for Spreadsheet</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
          <input
            className="inputTag"
            placeholder="Service / Label (e.g. AWS Secret Key)"
            value={newService}
            onChange={(e) => setNewService(e.target.value)}
          />
          <input
            className="inputTag"
            placeholder="Plaintext Password or Data"
            value={newPlaintext}
            onChange={(e) => setNewPlaintext(e.target.value)}
          />
          <button className="contactButton" onClick={handleGenerateEncryption}>
            GENERATE CIPHERTEXT
          </button>
          {generatedServiceCipher && generatedPayloadCipher && (
            <div style={{ marginTop: '15px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div>
                <small style={{ color: '#aaa' }}>1. Copy this into the <strong>Service</strong> column:</small>
                <textarea
                    className="inputTag"
                    readOnly
                    rows={2}
                    value={generatedServiceCipher}
                    style={{ width: '100%', marginTop: '4px', fontFamily: 'monospace' }}
                />
                </div>
                <div>
                <small style={{ color: '#aaa' }}>2. Copy this into the <strong>EncryptedPayload</strong> column:</small>
                <textarea
                    className="inputTag"
                    readOnly
                    rows={2}
                    value={generatedPayloadCipher}
                    style={{ width: '100%', marginTop: '4px', fontFamily: 'monospace' }}
                />
                </div>
            </div>
           )}
        </div>
      </div>
    </div>
  );
}