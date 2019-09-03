import React from 'react';

export const CodeResult: React.FC<{ loading: boolean; error: string; data: string[] }> = ({
  loading,
  data,
  error,
}) => {
  if (loading) {
    return 'Loading...';
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <div>
      {data.map(d => (
        <p>{d}</p>
      ))}
    </div>
  );
};
