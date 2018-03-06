import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import Spectator from "../../components/spectator";

const mapStateToProps = (state, ownProps) => ({
  players: state.players,
  me: { id: null, name: null },
  prompt: state.prompt,
  game: state.game,
  board: state.board,
  deck: state.deck
});

const mapDispatchToProps = (dispatch, ownProps) =>
  bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Spectator);
