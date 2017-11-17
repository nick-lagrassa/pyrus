import { MOVE_WRITE, MOVE_DISCARD, MOVE_CONSUME } from '../../constants/move';
import { CARDS_HASH_TABLE,
         CARDS_BINARY_SEARCH_TREE,
         CARDS_CLASS,
         CARDS_CONDITIONAL,
         CARDS_DO_WHILE_LOOP,
         CARDS_FOR_LOOP,
         CARDS_HELPER_FUNCTION,
         CARDS_ARRAY,
         CARDS_LINKED_LIST,
         CARDS_OBJECT,
         CARDS_QUEUE,
         CARDS_STACK,
         CARDS_SWITCH_CASE
       } from '../../constants/cards';
import { isArray,
         isObject,
         isLoop,
         isConditional,
         isTernaryConditional,
         isClass,
         isSwitch,
         isFunction
        } from '../../util';
import * as JsDiff from 'diff';
import espree from 'espree';

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
        switch(move.type) {
            case MOVE_DISCARD:
                return deck.cards.length > 0 && this.playerHasCard(players, move);
            case MOVE_CONSUME:
                return this.playerHasCard(players, move) && this.isValidCodeForCard(move);
            case MOVE_WRITE:
                const diff = this.getEditorDifference(board.editor, move.code);
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

    isValidCodeForCard(move) {
        const diff = getEditorDifference(board.editor, move.code);
        switch(move.card.type) {
            case CARDS_HASH_TABLE:
                break;
            case CARDS_OBJECT:
                break;
            case CARDS_BINARY_SEARCH_TREE:
                break;
            case CARDS_CLASS:
                break;
            case CARDS_CONDITIONAL:
                break;
            case CARDS_FOR_LOOP:
                break;
            case CARDS_WHILE_LOOP:
                break;
            case CARDS_DO_WHILE_LOOP:
                break;
            case CARDS_HELPER_FUNCTION:
                break;
            case CARDS_ARRAY:
                break;
            case CARDS_LINKED_LIST:
                break;
            case CARDS_OBJECT:
                break;
            case CARDS_QUEUE:
                break;
            case CARDS_STACK:
                break;
            case CARDS_SWITCH_CASE:
                break;
            default:
                return false;
        }
    }
    // gets diff on board editor and new editor string, returns only the string of the
    // code that has been added
    // string, string -> string
    getEditorDifference(oldCode, newCode) {
        const diff = JsDiff.diffLines(oldCode, newCode);
        let addedCode = diff.filter(line => { return line.added === true });

        let changed = '';
        addedCode.filter(line => { return changed += line.value });

        return changed;
    }

    isPrimitiveWrite(code) {
        const patterns = [
            isArray,
            isObject,
            isLoop,
            isConditional,
            isTernaryConditional,
            isClass,
            isSwitch,
            isFunction
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
                if (e instanceof ReferenceError) {
                    // TODO what should this be
                    console.log(e);
                    return false;
                }
            }
        }
        return true;
    }
}

export default RulesEnforcer;
