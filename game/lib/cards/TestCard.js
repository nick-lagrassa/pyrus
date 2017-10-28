import Card from '../../components/Card';

class TestCard extends Card {
    constructor() {
        super();
        this._type = 'Bogus Card';
        this._implementation = '';
        this._example = '';
    }
}

export default TestCard;
