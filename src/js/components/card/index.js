import React from 'react';

export default ({ card }) => (
    <div className="w5 h5 ba b--pear-light-gray br2 pa3">
        <p className="f3 mt0">{ card._title }</p>
        <div className="bg-pear-near-white pa2 mv2">
            <p className="f5 code mv2">{ card._implementation }</p>
        </div>
        <div className="bg-pear-near-white pa2">
            <p className="f5 code mv2">{ card._example }</p>
        </div>
    </div>
);
