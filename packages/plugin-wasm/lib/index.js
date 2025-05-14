import * as moveLocalOnTop from './move-local-on-top/index.js';
import * as convertConstToLocal from './convert-const-to-local/index.js';
import * as removeUselessIdentifierSuffix from './remove-useless-identifier-suffix/index.js';
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
    'remove-useless-identifier-suffix': removeUselessIdentifierSuffix,
    'convert-const-to-local': convertConstToLocal,
    'move-local-on-top': moveLocalOnTop,
};
