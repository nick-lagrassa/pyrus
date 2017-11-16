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

    isArray(tree) {
        return tree.body[0].declarations[0].init.type === 'ArrayExpression';
    }

    isObject(tree) {
        return tree.body[0].declarations[0].init.type === 'ObjectExpression';
    }

    isLoop(tree) {
        const loops = ['ForStatement', 'ForInStatement', 'ForOfStatement', 'WhileStatement', 'DoWhileStatement'];
        return loops.includes(tree.body[0].type);
    }

    // TODO if user write_move else statement without if - espree will return an error
    isConditional(tree) {
        const conditionals = ['IfStatement'];
        if (conditionals.includes(tree.body[0].type)) {
            return true;
        }
        return false;
    }

    isTernaryConditional(tree) {
        let conditional;
        try {
            conditional = tree.body[0].declaractions[0].init.type;
        } catch (e) {
            try {
                conditional = tree.body[0].expression.type;
            } catch (e){
                return false;
            }
        }
        return conditional === "ConditionalExpression";
    }

    isClass(tree) {
        return tree.body[0].type === 'ClassDeclaration';
    }

    isSwitch(tree) {
        return tree.body[0].type === 'SwitchStatement';
    }

    // Use abstract syntax tree of pattern string to identify if string is function declaration
    // string -> boolean
    isFunction(tree) {
        let ast = tree.body[0];
        switch(ast.type) {
            case 'FunctionDeclaration':
                return true;
            case 'VariableDeclaration':
                const expression = ast.declarations[0].init;
                if (expression.type.includes('FunctionExpression')) {
                    return true;
                } else if (expression.type === 'CallExpression' || expression.type === 'NewExpression') {
                    return expression.callee.type.includes('FunctionExpression');
                }
            case 'ClassDeclaration':
                return !!ast.body.body.filter(node => node.type.includes("Method"));
            case 'ExpressionStatement':
                return ast.expression.right.type.includes('FunctionExpression');
            default:
                return false;
        }
    }

    isPrimitiveWrite(code) {
        const patterns = [
            this.isArray,
            this.isObject,
            this.isLoop,
            this.isConditional,
            this.isTernaryConditional,
            this.isClass,
            this.isSwitch,
            this.isFunction
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
