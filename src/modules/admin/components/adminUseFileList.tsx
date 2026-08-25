import { useState, useEffect } from 'react';
import { env } from '../../../configs/environment';
import Papa from 'papaparse';

interface EmailRecord {
  ID?: string;
  ClientUserID?: string;
  Link?: string;
  FileType?:string;
  [key: string]: any;
}

export default function AdminUserFileList() {
  const [userEmails, setUserEmails] = useState<EmailRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const spreadsheetCSV = env.GOOGLE_DRIVE_FILES;
   
  // Animated loading bar state
  const length = 19;
  const [position, setPosition] = useState(0);
  // Animated loading bar interval
  useEffect(() => {
    const interval = setInterval(() => {
      setPosition((prevPosition) => (prevPosition + 1) % length);
    }, 250);

    return () => clearInterval(interval);
  }, []);

  const loadingIndicator = Array(length).fill("-").map((_char, index) => (index === position ? "|" : "=")).join("");

  const handleProjectClick = (actionName, targetUrl) => {
		if (typeof window !== 'undefined' && typeof (window as any).cf !== 'undefined') {
			(window as any).cf('event', { 'button_clicked': actionName });
		}

		if (targetUrl.startsWith('http')) {
			window.open(targetUrl, '_blank', 'noopener,noreferrer');
		} else {
			window.location.href = targetUrl; // Fallback vanilla method
		}
	};

  useEffect(() => {
    const fetchUserEmails = async () => {
      try {
        setLoading(true);
        setError(null);

        // 1. Fetch CSV tracking file
        const csvResponse = await fetch(spreadsheetCSV);
        if (!csvResponse.ok) {
          throw new Error('Failed to fetch from Drive.');
        }

        const csvData = await csvResponse.text();
        const parsedData = Papa.parse<EmailRecord>(csvData, {
          header: true,
          skipEmptyLines: true,
        }).data;

        // 2. Filter records matching current adminUserId
        const userId = sessionStorage.getItem('adminUserId')?.trim() || '';

        if (!userId) {
          throw new Error('No user session found. Please log in.');          
        window.location.href = '/admin/login';
        }

        const filteredEmails = parsedData.filter(
          (file) => file.ClientUserID?.trim() === userId
        );

        setUserEmails(filteredEmails);
      } catch (err: any) {
        console.error('Error fetching user emails:', err);
        setError(err.message || 'An error occurred while fetching emails.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserEmails();
  }, [spreadsheetCSV]);

  return (
    <div className="user-email-list" style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>User Document Directory</h2>

        { loading && <div>
          <h1 style={{textAlign:'center'}}> {loadingIndicator} </h1>
          <p style={{ padding: '20px',textAlign: 'center' }}> Loading Documents</p>
        </div>}
        {error && <div>
          <h1 style={{textAlign:'center'}}> {loadingIndicator} </h1>
          <p style={{ padding: '20px', textAlign: 'center' }}>Error: {error}</p>
        </div>}

      {!loading && !error && (
        <>
          <p><strong>Total Files Found:</strong> {userEmails.length}</p>

          {userEmails.length === 0 ? (
            <p style={{ marginTop: '15px', color: '#64748b' }}>No documents found for this user ID.</p>
          ) : (
            <div style={{ display: 'grid', gap: '12px', marginTop: '15px' }}>
              {userEmails.map((item, index) => (
                <div
                  key={item.ID || index}
                  style={{
                    padding: '16px',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: '#ffffff',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                  }}
                >
                  <div>
                    <h1 style={{ fontWeight: 'bold', fontSize: '15px', color: '#1e293b' }}>
                      {item.Filename || 'N/A'}
                    </h1>
                    <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>
                      Document ID: {item.ID || 'N/A'}
                    </div>
                    {item.Link && (
                      <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>
                        Source: {item.Link.substring(0, 45)}...
                      </div>
                    )}
                  </div>

                  {item.ID && (
                    <div
                      onClick={() => handleProjectClick(`Viewing file (${item.Filename})`, `${item.Link}`)}
                      style={{
                        padding: '8px 16px',
                        background: '#0284c7',
                        color: '#ffffff',
                        borderRadius: '6px',
                        textDecoration: 'none',
                        fontSize: '14px',
                        fontWeight: '600',
                      }}
                    >
                      View {item.FileType}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}