import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import GameRunning from '../../components/gameRunning';

const mapStateToProps = (state, ownProps) => ({
    players: state.players,
    me: state.me,
    prompt: state.prompt,
    game: state.game,
    board: state.board,
    deck: state.deck
});

const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators({

}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(GameRunning);
