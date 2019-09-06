import React from 'react';
import MonacoEditor from 'react-monaco-editor';

export const CodeEditor: React.FC<{
  onChange: (s: string) => void;
  value: string;
  language?: 'javascript';
}> = ({ value, onChange, language = 'javascript' }) => {
  return (
    <MonacoEditor
      width="100%"
      height="100%"
      language={language}
      theme="vs-dark"
      onChange={val => {
        onChange(val);
      }}
      value={value}
      options={{
        selectOnLineNumbers: true,
      }}
    />
  );
};
