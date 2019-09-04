import React from 'react';
import { hot } from 'react-hot-loader/root';
import { App } from './components/app';

const Root: React.FC<{}> = () => <App>Hello World!</App>;
export default hot(Root);
