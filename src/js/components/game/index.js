import React, { Component } from 'react';
import Card from '../card';

export default class Game extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { game } = this.props;

        return (
            <div>
                { game.deck.cards.map((card, i) => 
                    <Card
                        key={ i }
                        _type={ card._type }
                        _implementation={ card._implementation }
                        _example={ card._example }
                    />
                )}
            </div>
        );
    }
}
