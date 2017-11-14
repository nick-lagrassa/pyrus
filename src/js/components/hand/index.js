import React, { Component } from 'react';
import Card from '../card';

const Hand = ({ cards, handleCardClick }) => (
    cards ?
        cards.map((card, i) => <Card key={ i } card={ card } handleCardClick={ handleCardClick || null } />)
        :
        null
);

export default Hand;
