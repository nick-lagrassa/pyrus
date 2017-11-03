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
        this.firebaseRef = firebase.database().ref('firepads').child(props.gameId || '');
    }

    componentDidMount() {
        this.codeMirror = CodeMirror(this.editorElement, {
            lineWrapping: true,
            lineNumbers: true,
            mode: 'javascript',
            theme: 'monokai'
        });
        this.firepad = Firepad.fromCodeMirror(this.firebaseRef, this.codeMirror, {
            defaultText: '// Your code here'
        });
    }

    render() {
        return <div ref={ div => this.editorElement = div }></div>;
    }    
}
