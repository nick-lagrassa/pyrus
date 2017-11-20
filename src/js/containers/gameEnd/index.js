import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import GameEnd from '../../components/gameEnd';

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
)(GameEnd);
