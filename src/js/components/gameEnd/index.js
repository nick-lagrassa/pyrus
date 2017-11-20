import React, { Component } from 'react';
import settings from '../../../../game/config/settings';

export default class GameEnd extends Component {
    constructor(props) {
        super(props);
    }

    handleNextPromptClick = () => {
        window.location = window.location.origin;
    }

    render() {
        return (
            <div className="mw6 center mt6">
                <h1 className="tc f1 near-black">Submission Received!</h1>
                <div
                    className="flex justify-center"
                >
                    <input
                        type="submit"
                        className="input-reset ba bg-pear-blue b--pear-blue pa3 br2 white pointer"
                        value="Next Challenge"
                        onClick={ this.handleNextPromptClick }
                    />
                </div>
            </div>
        );
    }
}
