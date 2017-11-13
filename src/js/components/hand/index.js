import React, { Component } from 'react';
import Card from '../card';

const Hand = ({ cards, stream }) => (
    cards ?
        cards.map((card, i) => <Card key={ i } card={ card } stream={ stream } />)
        :
        null
);

export default Hand;
