import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Editor from '../../components/editor';

const mapStateToProps = (state, ownProps) => ({
    prompt: state.prompt,
    board: state.board
});

const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators({

}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Editor);
