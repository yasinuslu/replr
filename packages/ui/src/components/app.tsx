import React, { useState } from 'react';
import axios from 'axios';
import { CodeEditor } from './codeEditor';
import { CodeResult } from './codeResult';

console.log({ env: process.env.NODE_ENV });

const client = axios.create({
  baseURL: 'http://localhost:3200',
});

export const App: React.FC<{}> = () => {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState([]);
  const [error, setError] = useState(null);

  return (
    <div>
      <CodeEditor onChange={setCode} />
      <CodeResult loading={loading} error={error} data={result} />

      <button
        type="button"
        onClick={async () => {
          setLoading(true);
          setError(null);
          setResult([]);

          try {
            const { data: res } = await client.post('/exec', { platform: 'node', code });

            if (res.error) {
              throw new Error(res.error);
            }

            setResult(res.data);
          } catch (err) {
            setError(err.message);
          }

          setLoading(false);
        }}
      >
        Run
      </button>
    </div>
  );
};
