import React, { Component } from 'react';
import settings from '../../config/settings';
import * as firebase from 'firebase';
import Firepad from 'firepad';

export default class Editor extends Component {
    constructor(props) {
        super(props);
        this.app = firebase.initializeApp({
            apiKey: settings.FIREBASE_API_KEY,
            databaseURL: settings.FIREBASE_DATABASE_URL,
            authDomain: settings.FIREBASE_AUTH_DOMAIN
        });
        this.firebaseRef = firebase.database().ref('firepads').child(props.gameId);
    }

    componentDidMount() {
        const { getEditor } = this.props;

        this.codeMirror = CodeMirror(this.editorElement, {
            lineWrapping: true,
            lineNumbers: true,
            mode: 'javascript',
            theme: 'monokai'
        });
        this.firepad = Firepad.fromCodeMirror(this.firebaseRef, this.codeMirror, {
            defaultText: '// Your code here'
        });

        getEditor(this.codeMirror);
    }

    render() {
        const { prompt } = this.props;
        return (
            <div className="mb6">
                <pre className="moon-gray antialias ma0 pv2 ph3 br2 br--top bg-near-black">{ `${ prompt._signature } {` }</pre>
                <div ref={ div => this.editorElement = div }></div>
                <pre className="moon-gray antialias ma0 pv2 ph3 br2 br--bottom bg-near-black">}</pre>
            </div>
        );
    }    
}
