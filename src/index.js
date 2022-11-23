import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { PublicClientApplication } from '@azure/msal-browser';

const msalAuth = new PublicClientApplication({
  auth: {
    clientId: 'd0042183-fbc3-481e-9b11-e43120af5856',
    authority: 'https://login.microsoftonline.com/3882b70d-a91e-468c-9928-820358bfbd73',
    clientScret: '4Lg8Q~ORm9VOrVFCbCdu0Ix6vlqPbBAMNhGBfbWz',
    resource: 'https://management.azure.com',
    redirectUri: '/',
  },
  cache: {
    cacheLocation: 'localStorage',
    storeAuthStateInCookie: false,
  }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <App msalInstance={msalAuth}/>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
