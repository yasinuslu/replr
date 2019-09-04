import React, { useState } from 'react';
import axios from 'axios';
import styled, { css } from 'styled-components';
import { CodeEditor } from './codeEditor';
import { CodeResult } from './codeResult';

const client = axios.create({
  baseURL: 'http://localhost:3200',
});

const Container = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  height: 100%;
`;

const EditorPanel = styled.div`
  display: flex;
  flex: 1;
`;

const ResultPanel = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const SettingsPanel = styled.div`
  display: flex;
  height: 50px;
  padding: 10px;
`;

const ResultContainer = styled.div`
  display: flex;
  flex: 1;
`;

const Button = styled.button`
  font-size: 30px;
  border: 2px solid;
  padding-left: 20px;
  padding-right: 20px;
  border-radius: 10px;
  font-weight: bold;
  cursor: pointer;
`;

export const App: React.FC<{}> = () => {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState([]);
  const [error, setError] = useState(null);

  return (
    <Container>
      <EditorPanel>
        <CodeEditor onChange={setCode} />
      </EditorPanel>
      <ResultPanel>
        <SettingsPanel>
          <Button
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
          </Button>
        </SettingsPanel>
        <ResultContainer>
          <CodeResult loading={loading} error={error} data={result} />
        </ResultContainer>
      </ResultPanel>
    </Container>
  );
};
