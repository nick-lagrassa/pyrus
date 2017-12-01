import { MOVE_WRITE, MOVE_DISCARD, MOVE_CONSUME } from '../../constants/move';
import cards from '../../lib/cards'
import * as util from '../../util';
import * as JsDiff from 'diff';
import * as cardConstants from '../../constants/cards'

class RulesEnforcer {
    // Returns whether a given move is legal to perform
    // THIS FUNCTION IS VERY BAD!! I'M NOT PROUD OF THIS
    // Board, Move -> bool
    isLegalMove(board, move, deck, players) {
        let checkMoveArgs;

        switch (arguments.length) {
            case 4:
                checkMoveArgs = [board, move, deck, players];
                break;
            case 2:
                checkMoveArgs = [board, move, board.deck, board.players];
                break;
            default:
                return false;
        }

        try {
            return this._checkMove(...checkMoveArgs);
        } catch (e) {
            return false;
        }
    }

    _checkMove(board, move, deck, players) {
        let diff;
        switch(move.type) {
            case MOVE_DISCARD:
                return deck.cards.length > 0 && this.playerHasCard(players, move);
            case MOVE_CONSUME:
                diff = this.getEditorDifference(board.editor, move.code);
                return this.playerHasCard(players, move) &&
                    this.isSingleMove(diff) &&
                    this.isValidCodeForCard(move.card.type, diff);
            case MOVE_WRITE:
                diff = this.getEditorDifference(board.editor, move.code);
                return this.isSingleMove(diff) && this.isPrimitiveWrite(diff);
            default:
                return false;
        }
        return true;
    }

    playerHasCard(players, move) {
        const player = players.filter(player => player.id === move.playerId)[0];
        return player && player.hand.filter(card => card.type === move.card.type).length > 0;
    }

    isValidCodeForCard(cardType, diff) {
        let card;
        switch(cardType) {
            case cardConstants.CARDS_HASH_TABLE:
                card = new cards.HashTableCard;
                break;
            case cardConstants.CARDS_BINARY_SEARCH_TREE:
                card = new cards.BSTCard;
                break;
            case cardConstants.CARDS_CLASS:
                card = new cards.ClassCard;
                break;
            case cardConstants.CARDS_CONDITIONAL:
                card = new cards.ConditionalCard;
                break;
            case cardConstants.CARDS_FOR_LOOP:
                card = new cards.ForCard;
                break;
            case cardConstants.CARDS_WHILE_LOOP:
                card = new cards.WhileCard;
                break;
            case cardConstants.CARDS_DO_WHILE_LOOP:
                card = new cards.DoWhileCard;
                break;
            case cardConstants.CARDS_HELPER_FUNCTION:
                card = new cards.FunctionCard;
                break;
            case cardConstants.CARDS_ARRAY:
                card = new cards.ArrayCard;
                break;
            case cardConstants.CARDS_LINKED_LIST:
                card = new cards.LinkedListCard;
                break;
            case cardConstants.CARDS_OBJECT:
                card = new cards.ObjectCard;
                break;
            case cardConstants.CARDS_QUEUE:
                card = new cards.QueueCard;
                break;
            case cardConstants.CARDS_STACK:
                card = new cards.StackCard;
                break;
            case cardConstants.CARDS_SWITCH_CASE:
                card = new cards.SwitchCard;
                break;
            default:
                return false;
        }

        try {
            return card.isInstanceOf(diff);
        } catch (e) {
            return false;
        }
    }

    // gets diff on board editor and new editor string, returns only the string of the
    // code that has been added
    // string, string -> string
    getEditorDifference(oldCode, newCode) {
        // this regex only works under the assumption that whitespace is trimmed
        const returnRe = /[;|\s]*?(return\s*\S*);?|^(return\s*\S*);?/;
        const diff = JsDiff.diffLines(oldCode, newCode, {
            ignoreWhitespace: true, 
            newlineIsToken: true 
        });
        let addedCode = diff.filter(line => line.added === true );

        let changed = '';
        for(let line of addedCode) {
            // remove return statements because they throw an error since we don't wrap
            // our diff inside a function
            changed += line.value.replace(returnRe, '');
        }

        return changed;
    }

    isSingleMove(code) {
        let tree;
        try {
            tree = util.getAST(code);
        } catch (e) {
            return false;
        }

        return tree.body.length <= 1;
    }

    isPrimitiveWrite(code) {
        const patterns = [
            util.isArray,
            util.isObject,
            util.isForLoop,
            util.isWhileLoop,
            util.isDoWhileLoop,
            util.isIfConditional,
            util.isTernaryConditional,
            util.isClass,
            util.isSwitch,
            util.isFunction
        ];

        let tree;
        try {
            tree = util.getAST(code);
        } catch (e) {
            return false;
        }
        
        for (let i = 0; i < patterns.length; i++) {
            try {
                if (patterns[i](tree)) {
                    return false;
                }
            } catch (e) {
                continue;
            }
        }
        return true;
    }
}

export default RulesEnforcer;
