import Card from '../../components/Card';
import { CARDS_BINARY_SEARCH_TREE } from '../../constants/cards.js';
import { isBinarySearchTree, getAST } from '../../util';

class BSTCard extends Card {
    constructor() {
        super();
        this.type = CARDS_BINARY_SEARCH_TREE;
        this.title = 'Binary Search Tree';
        this.implementation =
`function TreeNode(val) {
    this.val = val;
    this.left = null;
    this.right = null;
}`;
        this.example =
`var head = new TreeNode(12);
head.val; // -> 12
head.left = new TreeNode(9);
head.left.val; // -> 9
head.left.left; // -> null
head.left.right; // -> null`;
    }

    isInstanceOf(code) {
        const tree = getAST(code);
        return isBinarySearchTree(tree);
    }
}

export default BSTCard;
