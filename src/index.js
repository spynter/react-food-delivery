import React from "react";
import './index.css'
import * as ReactDOM from 'react-dom';

import { BrowserRouter as Router } from "react-router-dom";

import App from './App'
import { StateProvider } from "./context/StateProvider";
import { initialState } from "./context/initialState";
import reducer from "./context/reducer";

ReactDOM.render(
    <Router>
        <StateProvider initialState={initialState} reducer={reducer}>
        <App/>
        </StateProvider >
    </Router>, 
    document.getElementById("root")
);