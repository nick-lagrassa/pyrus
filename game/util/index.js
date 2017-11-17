export const activePlayerIndex = (turnCount, numPlayers) => {
    return turnCount % numPlayers;
}

export const getActivePlayer = (game, players) => {
    return players[activePlayerIndex(game.turnCount, players.length)];
}

export const myTurn = (me, game, players) => {
    return getActivePlayer(game, players).id === me.id;
}

export const isArray = tree => {
    return tree.body[0].declarations[0].init.type === 'ArrayExpression';
}

export const isObject = tree => {
    return tree.body[0].declarations[0].init.type === 'ObjectExpression';
}

export const isLoop = tree => {
    const loops = ['ForStatement', 'ForInStatement', 'ForOfStatement', 'WhileStatement', 'DoWhileStatement'];
    return loops.includes(tree.body[0].type);
}

// TODO if user write_move else statement without if - espree will return an error
export const isConditional = tree => {
    const conditionals = ['IfStatement'];
    if (conditionals.includes(tree.body[0].type)) {
        return true;
    }
    return false;
}

export const isTernaryConditional = tree => {
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

export const isClass = tree => {
    return tree.body[0].type === 'ClassDeclaration';
}

export const isSwitch = tree => {
    return tree.body[0].type === 'SwitchStatement';
}

// Use abstract syntax tree of pattern string to identify if string is function declaration
// string -> boolean
export const isFunction = tree => {
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
