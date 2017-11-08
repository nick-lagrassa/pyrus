import React, { Component } from 'react';
import Card from '../card';

export default class Hand extends Component {
    render() {
        const { cards, className, title } = this.props;

        if (!cards) {
            return null;
        }

        return (
            <div className={ className }>
                { title }
                <div class="flex">
                    { cards.map((card, i) => 
                        <Card card={ card } key={ i }/>
                    )}
                </div>
            </div>
        );
    }
}
