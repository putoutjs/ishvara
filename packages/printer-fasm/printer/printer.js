import {print as putoutPrint} from '@putout/printer';
import {CallExpression} from './visitors/call-expression.js';
import {MemberExpression} from './visitors/member-expression.js';
import {BlockStatement} from './visitors/block-statement.js';
import {LabeledStatement} from './visitors/labeled-statement.js';
import {ExpressionStatement} from './visitors/expression-statement/expression-statement.js';
import {SequenceExpression} from './visitors/sequence-expression.js';
import {AssignmentExpression} from './visitors/assignment-expression.js';

export const print = (ast) => {
    return putoutPrint(ast, {
        semantics: {
            comments: false,
        },
        visitors: {
            AssignmentExpression,
            CallExpression,
            MemberExpression,
            BlockStatement,
            LabeledStatement,
            ExpressionStatement,
            SequenceExpression,
        },
    });
};
