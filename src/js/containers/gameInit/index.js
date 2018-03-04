import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import GameInit from "../../components/gameInit";

const mapStateToProps = (state, ownProps) => ({
  players: state.players,
  me: state.me
});

const mapDispatchToProps = (dispatch, ownProps) =>
  bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(GameInit);
