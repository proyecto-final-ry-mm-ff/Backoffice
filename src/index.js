import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ReactFlowProvider } from 'react-flow-renderer';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

    <ReactFlowProvider>
      <App />
    </ReactFlowProvider>
  </React.StrictMode>
);


reportWebVitals();
