import Card from '../../components/Card';

class TestCard extends Card {
    constructor() {
        super();
        this.type = 'Bogus Card';
        this.title = 'Test Card';
        this.implementation = '';
        this.example = '';
    }
}

export default TestCard;
