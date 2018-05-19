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
    const { board } = this.props;
    if (board.lastResetTimestampMS !== nextProps.board.lastResetTimestampMS) {
      this.codeMirror.setValue("");
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
    this.firepad = Firepad.fromCodeMirror(
      this.firebaseRef,
      this.codeMirror,
      {}
    );
    getEditor(this.codeMirror);
  }

  render() {
    const { prompt } = this.props;
    return (
      <div className="mb6">
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
