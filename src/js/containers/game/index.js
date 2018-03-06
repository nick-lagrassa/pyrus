import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import Game from "../../components/game";
import { setInfo } from "../../actions/me";

const mapStateToProps = (state, ownProps) => ({
  ...state
});

const mapDispatchToProps = (dispatch, ownProps) =>
  bindActionCreators(
    {
      setInfo
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Game);
