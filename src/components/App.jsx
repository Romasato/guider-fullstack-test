import React from 'react';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";

import {AvailabilityCalendar} from './AvailabilityCalendar';

import logo from '../logo.svg';
import '../styles/App.css';

function App() {
    return (
        <Router>
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                </header>
                <main>
                    <Switch>
                        <Route exact path="/">
                            <Redirect to="/calendar" />
                        </Route>
                        <Route path='/calendar'>
                            <AvailabilityCalendar />
                        </Route>
                    </Switch>
                </main>
            </div>
        </Router>
    );
}

export default App;
