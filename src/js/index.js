import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { Game } from './routes';

const App = () => <Game />;

ReactDOM.render(
    <App />,
    document.getElementById('app')
);
