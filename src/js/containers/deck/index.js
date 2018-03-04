import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import Deck from "../../components/deck";

const mapStateToProps = (state, ownProps) => ({
  ...state.deck
});

const mapDispatchToProps = (dispatch, ownProps) =>
  bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Deck);
