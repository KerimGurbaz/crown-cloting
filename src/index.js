import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from './reportWebVitals';

import { Provider } from "react-redux";
import App from "./App";



import { CartProvider } from "./contexts/cart.context";
import {store} from './store/store'

import "./index.scss";

const rootElemet = document.getElementById("root");
render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>


            <CartProvider>
              <App />
            </CartProvider>

      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  rootElemet
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
