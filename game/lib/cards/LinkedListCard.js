import Card from '../../components/Card';
import { CARDS_LINKED_LIST } from '../../constants/cards.js';
import { isLinkedList } from '../../util';
import espree from 'espree';

class LinkedListCard extends Card {
    constructor() {
        super();
        this.type = CARDS_LINKED_LIST;
        this.title = 'Linked List';
        this.implementation = 
`function ListNode(val) {
    this.val = val;
    this.next = null;
}`;
        this.example = 
`var head = new ListNode(12);
head.val; // -> 12
head.next = new ListNode(15);
head.next.val; // -> 15
head.next.next; // -> null`;
    }

    isInstanceOf(code) {
        const tree = espree.parse(code);
        return isLinkedList(tree);
    }
}

export default LinkedListCard;
