import React, { Component } from 'react';
import Card from '../card';

export default class Hand extends Component {
    render() {
        const { cards } = this.props;

        if (!cards) {
            return null;
        }

        return (
            <div>
                { cards.map((card, i) => 
                    <Card card={ card } key={ i }/>
                )}
            </div>
        );
    }
}
