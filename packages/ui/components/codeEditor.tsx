import React from 'react';

export const CodeEditor: React.FC<{ onChange: (s: string) => void }> = ({ onChange }) => {
  return <textarea onChange={e => onChange(e.target.value)} />;
};
