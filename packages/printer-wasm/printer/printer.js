import {print as putoutPrint} from '@putout/printer';
import {CallExpression} from './visitors/call-expression.js';
import {BlockStatement} from './visitors/block-statement.js';
import {ExpressionStatement} from './visitors/expression-statement/expression-statement.js';
import {ExportNamedDeclaration} from './visitors/export-named-declaration.js';
import {FunctionDeclaration} from './visitors/function-declaration.js';
import {Program} from './visitors/program.js';
import {Identifier} from './visitors/identifier.js';

export const print = (ast) => {
    return putoutPrint(ast, {
        format: {
            quote: '"',
        },
        semantics: {
            comments: false,
        },
        visitors: {
            CallExpression,
            BlockStatement,
            ExpressionStatement,
            ExportNamedDeclaration,
            FunctionDeclaration,
            Program,
            Identifier,
        },
    });
};
