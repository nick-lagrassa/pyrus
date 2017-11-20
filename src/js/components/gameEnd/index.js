import React, { Component } from 'react';
import settings from '../../../../game/config/settings';

export default class GameEnd extends Component {
    constructor(props) {
        super(props);
    }

    handleNextPromptSubmit = () => {

    }

    render() {
        return (
            <div className="mw6 center mt6">
                <h1 className="tc f1 near-black">Submission Received!</h1>
                <form 
                    className="flex justify-center"
                    onSubmit={ this.handleNextPromptSubmit }
                >
                    <input
                        type="submit"
                        className="input-reset ba bg-pear-green b--pear-green pa3 br2 white pointer"
                        value="Next Challenge"
                    />
                </form>
            </div>
        );
    }
}
