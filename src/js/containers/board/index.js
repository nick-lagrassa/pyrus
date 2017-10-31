import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Board from '../../components/board';

const mapStateToProps = (state, ownProps) => ({
    ...state.board
});

const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators({

}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Board);
