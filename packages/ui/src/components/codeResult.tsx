import React from 'react';

export const CodeResult: React.FC<{ loading: boolean; error: string | null; data: string[] }> = ({
  loading,
  data,
  error,
}) => {
  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return (
      <h1>
        <pre>{error}</pre>
      </h1>
    );
  }

  return (
    <div>
      <pre>{data.join('\n')}</pre>
    </div>
  );
};
