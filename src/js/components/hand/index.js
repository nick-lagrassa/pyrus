import React, { Component } from 'react';
import Card from '../card';

export default class Hand extends Component {
    render() {
        const { cards } = this.props;

        return (
            <div>
                { cards.map((card, i) => 
                    <Card card={ card } key={ i }/>
                )}
            </div>
        );
    }
}
