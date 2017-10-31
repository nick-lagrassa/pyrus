import React from 'react';

export default ({ card }) => (
    <div className="w5 ba br4 pa4">
        <p className="f2 mt0">{ card._type }</p>
        <p className="f5 code">{ card._implementation }</p>
        <p className="f5 code">{ card._example }</p>
    </div>
);
