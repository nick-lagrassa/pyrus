import React, { Component } from 'react';
import Card from '../card';

const Hand = ({ cards, handleCardClick, inverse=false }) => (
    cards ?
        cards.map((card, i) => (
            <Card 
                key={ i }
                card={ card }
                handleCardClick={ handleCardClick || null }
                style={ inverse ?
                    { right: `${ (cards.length - i - 1) * 100 }px` }
                    :
                    { left: `${ i * 100 }px` }
                }
            />
        ))
        :
        null
);

export default Hand;
