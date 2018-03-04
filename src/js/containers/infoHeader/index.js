import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import InfoHeader from "../../components/infoHeader";

const mapStateToProps = (state, ownProps) => ({
  game: state.game,
  me: state.me,
  players: state.players,
  deck: state.deck
});

const mapDispatchToProps = (dispatch, ownProps) =>
  bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(InfoHeader);
