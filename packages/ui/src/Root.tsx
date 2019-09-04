import React from 'react';
import { hot } from 'react-hot-loader/root';
import { createGlobalStyle } from 'styled-components';
import { App } from './components/app';

const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
  }

  #root {
    width: 100vw;
    height: 100vh;
  }
`;

const Root: React.FC<{}> = () => (
  <>
    <App />
    <GlobalStyle />
  </>
);
export default hot(Root);
