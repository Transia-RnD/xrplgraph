import 'react-perfect-scrollbar/dist/css/styles.css';
import { enableES5 } from 'immer';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { XrplGraphProvider } from './contexts/XrplGraphContext';
import * as serviceWorker from './serviceWorker';
import App from './App';

enableES5();

ReactDOM.render(
  <XrplGraphProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </XrplGraphProvider>,
  document.getElementById('root')
);

serviceWorker.unregister();
