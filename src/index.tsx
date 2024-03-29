import React from "react";
import ReactDOM from "react-dom";
import { createGlobalStyle } from "styled-components";
import App from "./App";
import background from "img/background.png";
import reportWebVitals from "./reportWebVitals";

const GlobalStyle = createGlobalStyle`
  *, *:before, *:after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  
  body {
    min-height: 100vh;
    font-family: "Poppins", sans-serif;
    font-size: 1rem;
    background-image: url(${background});
    background-size: cover;
    background-position: center;
  }

  button:hover {
    cursor: pointer;
  }
`;

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
