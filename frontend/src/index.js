import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import WelcomeScreen from "./components/WelcomeScreen.jsx";
import { BrowserRouter as Router, Route} from "react-router-dom";
import store from "./store";
import { Provider } from "react-redux";

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Route exact path="/">
                <WelcomeScreen />
            </Route>
            <Route  exact path="/chat">
                <App />
            </Route>
        </Router>
    </Provider>,
     document.getElementById('root'));

