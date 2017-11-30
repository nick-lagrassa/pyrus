import espree from 'espree';

export const activePlayerIndex = (turnCount, numPlayers) => {
    return turnCount % numPlayers;
}

export const getActivePlayer = (game, players) => {
    return players[activePlayerIndex(game.turnCount, players.length)];
}

export const myTurn = (me, game, players) => {
    return getActivePlayer(game, players).id === me.id;
}

export const getAST = code => {
    const tree = espree.parse(code, { ecmaVersion: 6 });
    // TODO: fix this extremely hacky way of testing for console logs
    tree.body = tree.body.filter(node => (
        !(node.type === 'ExpressionStatement' && 
            node.expression &&
            node.expression.callee &&
            node.expression.callee.type === 'MemberExpression' && 
            node.expression.callee.object &&
            node.expression.callee.object.name === 'console')
    ));
    return tree;
}

export const isArray = tree => {
    try {
        return tree.body[0].declarations[0].init.type === 'ArrayExpression';
    } catch (e) {
        return false;
    }
}

export const isObject = tree => {
    try {
        return tree.body[0].declarations[0].init.type === 'ObjectExpression';
    } catch (e) {
        return false;
    }
}

export const isForLoop = tree => {
    const loops = ['ForStatement', 'ForInStatement', 'ForOfStatement'];
    try {
        return loops.includes(tree.body[0].type);
    } catch (e) {
        return false;
    }
}

export const isWhileLoop = tree => {
    try {
        return tree.body[0].type === 'WhileStatement';
    } catch (e) {
        return false;
    }
}

export const isDoWhileLoop = tree => {
    try {
        return tree.body[0].type === 'DoWhileStatement';
    } catch (e) {
        return false;
    }
}

// TODO if user write_move else statement without if - espree will return an error
export const isIfConditional = tree => {
    try {
        return tree.body[0].type === 'IfStatement';
    } catch (e) {
        return false;
    }
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
    try {
        return tree.body[0].type === 'ClassDeclaration';
    } catch (e) {
        return false;
    }
}

export const isSwitch = tree => {
    try {
        return tree.body[0].type === 'SwitchStatement';
    } catch (e) {
        return false;
    }
}

// Use abstract syntax tree of pattern string to identify if string is function declaration
// string -> boolean
export const isFunction = tree => {
    try {
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
    } catch (e) {
        return false;
    }

}

export const isBinarySearchTree = tree => {
	return isClass(tree) || isFunction(tree);
}

export const isLinkedList = tree => {
	return isClass(tree) || isFunction(tree);
}

export const isQueue = tree => {
	return isArray(tree);
}

export const isStack = tree => {
	return isArray(tree);
}

// Given AST of only the IF statement object
// AST Obj -> bool
export const isEmptyIfBlock = ifAST => {
    if(ifAST.hasOwnProperty('body')) {
        if(tree.body.length > 0) {
            return false;
        }
    }
    if(ifAST.hasOwnProperty('consequent')) {
        if (ifAST.consequent.body.length > 0) {
            return false;
        }
    }
    if(ifAST.hasOwnProperty('alternate')) {
        return isEmptyIfBlock(ifAST.alternate);
    }
    return true;
}

// Given AST of only the WHILE statement object
// AST Obj -> bool
export const isEmptyLoopBlock = loopAST => {
    return loopAST.body.body.length === 0;
}

// TODO: return statement causes error in AST and is a workaround
// for a user implementing a switch case to add code to body
// Given AST of only the SWITCH statement object
// check that each case only holds at most a break statement
// AST Obj -> bool
export const isEmptySwitchBlock = switchAST => {
    if(switchAST.cases.length === 0) {
        return true;
    } else {
        const branchingStatements = ['BreakStatement', 'ReturnStatement'];
        for(let caseObj of switchAST.cases) {
            if(caseObj.consequent.length > 1) {
                return false;
            } else if (caseObj.consequent.length === 1) {
                if(!branchingStatements.includes(caseObj.consequent[0].type)) {
                    return false;
                }
            }
        }
        return true;
    }
}