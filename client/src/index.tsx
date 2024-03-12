import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {StyleSheetManager} from "styled-components";
import isPropValid from '@emotion/is-prop-valid';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
   <React.StrictMode>
        <StyleSheetManager shouldForwardProp={prop => isPropValid(prop)}>
            <QueryClientProvider client={queryClient}>
                <App />
            </QueryClientProvider>
        </StyleSheetManager>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
