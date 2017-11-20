import Card from '../../components/Card';
import { CARDS_HASH_TABLE } from '../../constants/cards.js';
import { isObject, getAST } from '../../util';

class HashTableCard extends Card {
    constructor() {
        super();
        this.type = CARDS_HASH_TABLE;
        this.title = 'Hash Table';
        this.implementation = `var hash = { foo: 'bar' };`;
        this.example = `
hash["foo"]; // -> "bar"
hash["bar"]; // -> undefined
"foo" in hash; // -> true
"bar" in hash; // -> false
hash["bar"] = "baz";
hash["bar"]; // -> "baz"
hash.keys(); // -> ["foo", "bar"];
        `;
    }

    isInstanceOf(code) {
        const tree = getAST(code);
        return isObject(tree);
    }
}

export default HashTableCard;
