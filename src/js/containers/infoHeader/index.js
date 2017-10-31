import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import InfoHeader from '../../components/infoHeader';

const mapStateToProps = (state, ownProps) => ({
    ...state
});

const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators({

}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(InfoHeader);
