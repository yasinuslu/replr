import React, { useState, useReducer } from 'react';
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

type ActionType =
  | {
      type: 'run';
    }
  | {
      type: 'run-success';
      payload: { result: string[] };
    }
  | {
      type: 'run-error';
      payload: { error: string };
    };

type StateType = {
  loading: boolean;
  result: string[] | null;
  error: string | null;
};

const initialState = {
  loading: false,
  result: null,
  error: null,
};

function reducer(state: StateType, action: ActionType): StateType {
  switch (action.type) {
    case 'run':
      return {
        ...state,
        error: null,
        result: null,
        loading: true,
      };
    case 'run-success':
      return {
        ...state,
        error: null,
        result: action.payload.result,
        loading: false,
      };
    case 'run-error':
      return {
        ...state,
        error: action.payload.error,
        result: null,
        loading: false,
      };
    default:
      return state;
  }
}

const exampleCode = `
async function fetchNumbers() {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return Array.from({ length: 10 }).map(() => Math.random());
}

(async () => {
    const numbers = await fetchNumbers();
    console.log(JSON.stringify(numbers, null, 2));
})();
`.trim();

export const App: React.FC<{}> = () => {
  const [code, setCode] = useState(exampleCode);
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Container>
      <EditorPanel>
        <CodeEditor value={code} onChange={setCode} />
      </EditorPanel>
      <ResultPanel>
        <SettingsPanel>
          <Button
            type="button"
            onClick={async () => {
              dispatch({ type: 'run' });

              try {
                const { data: res } = await client.post('/exec', { platform: 'node', code });

                if (res.error) {
                  throw new Error(res.error);
                }

                dispatch({ type: 'run-success', payload: { result: res.data } });
              } catch (err) {
                dispatch({ type: 'run-error', payload: { error: err.message } });
              }
            }}
          >
            Run
          </Button>
        </SettingsPanel>
        <ResultContainer>
          <CodeResult loading={state.loading} error={state.error} data={state.result} />
        </ResultContainer>
      </ResultPanel>
    </Container>
  );
};
