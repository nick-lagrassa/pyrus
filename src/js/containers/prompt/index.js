import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Prompt from '../../components/Prompt';

const mapStateToProps = (state, ownProps) => ({
    prompt: state.prompt,
});

const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators({

}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Prompt);
