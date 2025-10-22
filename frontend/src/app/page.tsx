'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [message, setMessage] = useState('Connecting to backend...');
  const [loading, setLoading] = useState(true);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchBackend = async () => {
      try {
        const res = await fetch(apiUrl || 'http://localhost:4000');
        const data = await res.text();
        setMessage(data); // will show "Welcome to Gas Price Predictor API!"
      } catch (err) {
        setMessage('Could not connect to backend');
      } finally {
        setLoading(false);
      }
    };
    fetchBackend();
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-700 flex flex-col items-center justify-center text-white">
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-extrabold">
          ⚡ {process.env.NEXT_PUBLIC_APP_NAME}
        </h1>
        <p className="text-gray-300 text-lg">
          Smart predictions. Real-time data. Powered by AI.
        </p>
        <div className="mt-6 bg-gray-800 px-6 py-3 rounded-xl shadow-lg border border-gray-700">
          <p className="text-lg font-medium">
            {loading ? '⏳ Connecting...' : message}
          </p>
        </div>
        <p className="text-sm text-gray-400 mt-6">
          Environment: {process.env.NEXT_PUBLIC_ENV}
        </p>
      </div>
    </main>
  );
}
