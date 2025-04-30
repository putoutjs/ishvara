import * as applyTypes from './apply-types/index.js';
import * as removeUselessDeclarations from './remove-useless-declarations/index.js';
import * as applyPutoutWastImport from './apply-putout-wast-import/index.js';

export const rules = {
    'apply-putout-wast-import': applyPutoutWastImport,
    'remove-useless-declarations': removeUselessDeclarations,
    'apply-types': applyTypes,
};
