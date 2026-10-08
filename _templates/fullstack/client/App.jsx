// {{TITLE}} — client
import { useEffect, useState } from 'react';

const TITLE = {{TITLE_JS}};

export default function App() {
  const [status, setStatus] = useState('checking…');

  useEffect(() => {
    fetch('/api/health')
      .then((r) => r.json())
      .then((d) => setStatus(d.ok ? 'server up' : 'server error'))
      .catch(() => setStatus('server down — is it running?'));
  }, []);

  return (
    <main>
      <h1>{TITLE}</h1>
      <p>API: {status}</p>
    </main>
  );
}
