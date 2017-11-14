import { MOVE_WRITE, MOVE_DISCARD, MOVE_CONSUME } from '../../constants/move';
import * as JsDiff from 'diff';
import espree from 'espree';

const ARRAY_PATTERN           = new RegExp('(\\[|\\])');
const OBJECT_PATTERN          = new RegExp('(\\{|\\})');
const FOR_PATTERN             = new RegExp('for(\\s|\\()');
const WHILE_PATTERN           = new RegExp('while(\\s{0,1}|\\()');
const DO_WHILE_PATTERN        = new RegExp('do(\\s{0,1}|\\()');
const IF_PATTERN              = new RegExp('if(\\s|\\()');
const ELSE_PATTERN            = new RegExp('else(\\s{0,1}|\\()');
const TERNARY_PATTERN         = new RegExp('\\?.*:');
const CLASS_PATTERN           = new RegExp('class\\s');
const SWITCH_CASE_PATTERN     = new RegExp('(switch|case.*:|default)');

class RulesEnforcer {
    // Returns whether a given move is legal to perform
    // THIS FUNCTION IS VERY BAD!! I'M NOT PROUD OF THIS
    // Board, Move -> bool
    isLegalMove(board, move, deck, players) {
        switch (arguments.length) {
            case 4:
                return this._checkMove(board, move, deck, players);
            case 2:
                return this._checkMove(board, move, board.deck, board.players);       
            default:
                return false;
        }
    }

    _checkMove(board, move, deck, players) {
        switch(move.type) {
            case MOVE_DISCARD:
                return deck.cards.length > 0 && this.playerHasCard(players, move);
            case MOVE_CONSUME:
                return this.playerHasCard(players, move);
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

    // Use abstract syntax tree of pattern string to identify if string is function declaration
    // string -> boolean
    isFunction(code) {
        const tree = espree.parse(code, { ecmaVersion: 6 });
        const declaration = tree.body[0];
        if (declaration.type === 'FunctionDeclaration') {
            return true;
        }
        else if (declaration.type === 'VariableDeclaration') {
            const expression = declaration.declarations[0].init;
            if (expression.type.includes('FunctionExpression')) {
                return true;
            }
            else if (expression.type === 'CallExpression' || expression.type === "NewExpression") {
                return expression.callee.type.includes('FunctionExpression');
            }
        }
        else if (declaration.type === "ClassDeclaration") {
            return declaration.body.body.filter(node => node.type.includes("Method")).length > 0;
        }

        return false;
    }

    isPrimitiveWrite(code) {
        const patterns = [
            ARRAY_PATTERN,
            OBJECT_PATTERN,
            FOR_PATTERN,
            WHILE_PATTERN,
            DO_WHILE_PATTERN,
            IF_PATTERN,
            ELSE_PATTERN,
            TERNARY_PATTERN,
            CLASS_PATTERN,
            SWITCH_CASE_PATTERN
        ];
        for (let i = 0; i < patterns.length; i++) {
            const pattern = patterns[i];
            if(code.match(pattern)) {
                return false;
            }
        }
        if (this.isFunction(code)) {
            return false;
        }
        return true;
    }
}

export default RulesEnforcer;
