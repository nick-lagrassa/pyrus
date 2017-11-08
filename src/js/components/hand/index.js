import React, { Component } from 'react';
import Card from '../card';

export default class Hand extends Component {
    render() {
        const { cards, className } = this.props;

        if (!cards) {
            return null;
        }

        return (
            <div className={ className }>
                { cards.map((card, i) => 
                    <Card card={ card } key={ i }/>
                )}
            </div>
        );
    }
}
