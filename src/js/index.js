import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

import Home from './components/home';
import GameProvider from './providers/game';

const App = () => (
    <BrowserRouter>
        <div>
            <Route exact path="/" component={ Home } />
            <Route path="/game/:gameId" component={ GameProvider } />
        </div>
    </BrowserRouter>
)

render(
    <App />,
    document.getElementById('app')
);
