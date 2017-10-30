import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Game from '../../components/game';

const mapStateToProps = (state, ownProps) => ({
    ...state
});

const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators({

}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Game);
