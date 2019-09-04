import React from 'react';
import MonacoEditor from 'react-monaco-editor';

export const CodeEditor: React.FC<{ onChange: (s: string) => void }> = ({ onChange }) => {
  return (
    <MonacoEditor
      width="800"
      height="600"
      language="javascript"
      theme="vs-dark"
      options={{
        selectOnLineNumbers: true,
      }}
      onChange={onChange}
      editorDidMount={() => {
        console.log('mounted');
      }}
    />
  );
};
