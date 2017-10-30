import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

import Home from './components/home';
import Game from './components/game';

const App = () => (
    <BrowserRouter>
        <div>
            <Route exact path="/" component={ Home } />
            <Route path="/game/:gameId" component={ Game } />
        </div>
    </BrowserRouter>
)

render(
    <App />,
    document.getElementById('app')
);
