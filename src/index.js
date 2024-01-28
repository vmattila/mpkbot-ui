import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter } from "react-router-dom";

import { Amplify } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';

import '@aws-amplify/ui-react/styles.css';


Amplify.configure({
  Auth: {
    userPoolWebClientId: process.env.REACT_APP_USER_WEB_CLIENT_ID,
    region: 'eu-north-1',
    Cognito: {
      userPoolId: process.env.REACT_APP_USER_POOL_ID,
      userPoolClientId: process.env.REACT_APP_USER_WEB_CLIENT_ID,
      loginWith: { // Optional
        oauth: {
          domain: process.env.REACT_APP_COGNITO_DOMAIN,
          scopes: ['openid'],
          redirectSignIn: [process.env.REACT_APP_COGNITO_REDIRECT_URL],
          redirectSignOut: [process.env.REACT_APP_COGNITO_REDIRECT_URL],
          responseType: 'token'
        }
      }
    }
  }
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Authenticator.Provider>
        <App />
      </Authenticator.Provider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
