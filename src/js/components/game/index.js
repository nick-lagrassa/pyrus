import React, { Component } from 'react';
import Card from '../card';
import { getGame } from '../../lib/api';

export default class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ready: false
        };
    }

    componentWillMount() {
        const { gameId } = this.props.match.params;
        getGame(gameId)
            .then(body => {
                this.setState({
                    game: body,
                    ready: true
                });
            })
            .catch(err => console.log(err));
    }

    render() {
        const { ready, game } = this.state;
        
        if (!ready) {
            return <h1>loading</h1>
        }

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
