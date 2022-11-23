import React from "react";
import ReactDOM from "react-dom/client";
import 'bootstrap/dist/css/bootstrap.css';
import "./index.css";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import { store } from './store'
import { Provider } from 'react-redux'
import Register from "./components/Register";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </Provider>
);
