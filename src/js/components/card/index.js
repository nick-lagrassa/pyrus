import React from 'react';

export default ({ _type, _implementation, _example }) => (
    <div className="w5 ba br4 pa4">
        <p className="f2 mt0">{ _type }</p>
        <p className="f5 code">{ _implementation }</p>
        <p className="f5 code">{ _example }</p>
    </div>
);
