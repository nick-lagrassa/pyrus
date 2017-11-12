import React, { Component } from 'react';
import Card from '../card';

const Hand = ({ cards }) => (
    cards ?
        cards.map((card, i) => <Card card={ card } key={ i }/>)
        :
        null
);

export default Hand;
