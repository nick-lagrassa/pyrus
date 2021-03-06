import React, { Component } from "react";
import * as firebase from "firebase";
import Firepad from "firepad";

export default class Editor extends Component {
  constructor(props) {
    super(props);
    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: process.env.FIREBASE_API_KEY,
        databaseURL: process.env.FIREBASE_DATABASE_URL,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN
      });
    }
    this.firebaseRef = firebase
      .database()
      .ref("firepads")
      .child(props.gameId);
  }

  componentWillUpdate(nextProps, nextState) {
    const { board, resetIsMoveCancelled } = this.props;
    const { isMoveCancelled } = nextProps;
    if (board.lastResetTimestampMS !== nextProps.board.lastResetTimestampMS) {
      this.codeMirror.setValue("");
    }

    if (isMoveCancelled) {
      this.codeMirror.setValue(board.editor);
      resetIsMoveCancelled();
    }
  }

  componentDidMount() {
    const { getEditor, handleEditorChange } = this.props;

    this.codeMirror = CodeMirror(this.editorElement, {
      lineWrapping: true,
      lineNumbers: true,
      mode: "javascript",
      theme: "monokai"
    });
    this.codeMirror.on("change", handleEditorChange);
    this.firepad = Firepad.fromCodeMirror(
      this.firebaseRef,
      this.codeMirror,
      {}
    );
    getEditor(this.codeMirror);
  }

  render() {
    const { prompt, enabled } = this.props;
    return (
      <div className={`mb6 ${enabled ? "" : "pointer-none"}`}>
        <pre className="moon-gray antialias ma0 pv2 ph3 br2 br--top bg-near-black">{`${
          prompt._signature
        } {`}</pre>
        <div ref={div => (this.editorElement = div)} />
        <pre className="moon-gray antialias ma0 pv2 ph3 br2 br--bottom bg-near-black">
          }
        </pre>
      </div>
    );
  }
}
