import * as convertVarToConst from './convert-var-to-const/index.js';
import * as applyFunctionDeclaration from './apply-function-declaration/index.js';
import * as applyTypes from './apply-types/index.js';
import * as removeUselessDeclarations from './remove-useless-declarations/index.js';
import * as applyPutoutWastImport from './apply-putout-wast-import/index.js';

export const rules = {
    'apply-function-declaration': applyFunctionDeclaration,
    'apply-putout-wast-import': applyPutoutWastImport,
    'remove-useless-declarations': removeUselessDeclarations,
    'apply-types': applyTypes,
    'convert-var-to-const': convertVarToConst,
};
