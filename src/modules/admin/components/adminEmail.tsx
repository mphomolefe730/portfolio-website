import { useState, useEffect } from 'react';
import { env } from '../../../configs/environment';
import { useParams } from 'react-router-dom';
import Papa from 'papaparse';

export default function AdminEmail() {
  const { emailId } = useParams();
  const [htmlContent, setHtmlContent] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const spreadsheetCSV = env.GOOGLE_DRIVE_FILES;

  useEffect(() => {
    const fetchHtmlFile = async () => {
      try {
        setLoading(true);
        setError(null);

        // 1. Fetch CSV tracking file
        const csvResponse = await fetch(spreadsheetCSV);
        if (!csvResponse.ok) {
          throw new Error('Failed to fetch the CSV file from Drive.');
        }

        const csvData = await csvResponse.text();
        const parsedUsers = Papa.parse<Record<string, string>>(csvData, {
          header: true,
          skipEmptyLines: true,
        }).data;

        // 2. Locate matching record
        const userId = sessionStorage.getItem('adminUserId');
        const currentFile = parsedUsers.find(
          (file) =>
            file.ID?.trim() === emailId?.trim() &&
            file.ClientUserID?.trim() === (userId ? userId.trim() : '')
        );

        if (!currentFile || !currentFile.Link) {
          throw new Error(`No matching file link found for ID: ${emailId}`);
        }

        const targetUrl = currentFile.Link.trim();

        // 3. Fetch HTML file string
        const htmlResponse = await fetch(targetUrl);
        if (!htmlResponse.ok) {
          throw new Error(`Failed to load target file (Status: ${htmlResponse.status})`);
        }

        const rawHtml = await htmlResponse.text();
        setHtmlContent(rawHtml);
      } catch (err: any) {
        console.error('Error fetching HTML file:', err);
        setError(err.message || 'An error occurred while loading the file.');
      } finally {
        setLoading(false);
      }
    };

    if (emailId) {
      fetchHtmlFile();
    } else {
      setError('No email ID provided in parameters.');
      setLoading(false);
    }
  }, [emailId, spreadsheetCSV]);

  return (
    <div className="admin-email" style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Admin Email</h1>
      <p><strong>Email ID / File ID:</strong> {emailId}</p>

      <div style={{ width: '100%', minHeight: '700px', marginTop: '15px' }}>
        {loading && <p style={{ padding: '20px', textAlign: 'center' }}>Loading document content...</p>}
        {error && <p style={{ padding: '20px', color: 'red', textAlign: 'center' }}>Error: {error}</p>}

        {!loading && !error && htmlContent && (
          <iframe
            srcDoc={htmlContent}
            title="Sandboxed Preview"
            // Restrict capabilities while allowing execution
            sandbox="allow-scripts allow-same-origin allow-popups"
            style={{
              width: '100%',
              height: '800px',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
            }}
          />
        )}
      </div>
    </div>
  );
}