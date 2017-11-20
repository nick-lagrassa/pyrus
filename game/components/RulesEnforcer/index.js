import { MOVE_WRITE, MOVE_DISCARD, MOVE_CONSUME } from '../../constants/move';
import cards from '../../lib/cards'
import * as util from '../../util';
import * as JsDiff from 'diff';
import espree from 'espree';
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
            // NOTE: this is probably not the best way to do this. We want users to
            // be able to submit syntactically incorrect code, but we DON'T want to
            // return true if an error is thrown due to some dumb mistake we made.
            // For now, we're just treating all errors as legal moves.
            return true;
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
                          this.isValidCodeForCard(move.card.type, diff);
            case MOVE_WRITE:
                diff = this.getEditorDifference(board.editor, move.code);
                return this.isPrimitiveWrite(diff);
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
            return card.isInstanceOf(diff)
        } catch (e) {
            // TODO if syntax invalid while implementing consume card then we automatically allow
            // instead we should be able to recognize if someone is at least 'trying' to implement
            // the right card -- pattern matching might do this
            return true;
        }
    }
    // gets diff on board editor and new editor string, returns only the string of the
    // code that has been added
    // string, string -> string
    getEditorDifference(oldCode, newCode) {
        const diff = JsDiff.diffLines(oldCode, newCode, { newlineIsToken: true });
        let addedCode = diff.filter(line => { return line.added === true });

        let changed = '';
        for(let line of addedCode) {
            changed += line.value
        }

        return changed;
    }

    isPrimitiveWrite(code) {
        const patterns = [
            util.isArray,
            util.isObject,
            util.isForLoop,
            util.isWhileLoop,
            util.isDoWhileLoop,
            util.isConditional,
            util.isTernaryConditional,
            util.isClass,
            util.isSwitch,
            util.isFunction
        ];
        const tree = espree.parse(code, { ecmaVersion: 6 });

        if (tree.body.length > 1) {
            return false;
        }
        for (let i = 0; i < patterns.length; i++) {
            try {
                if(patterns[i](tree)) {
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
