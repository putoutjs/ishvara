import * as removeUselessReturn from './remove-useless-return/index.js';
import * as applyEq from './apply-eq/index.js';
import * as applyI32Const from './apply-i32-const/index.js';
import * as applyWasmMemory from './apply-wasm-memory/index.js';
import * as convertExportMemoryToCall from './convert-export-memory-to-call/index.js';
import * as applyDataAddressType from './apply-data-address-type/index.js';
import * as convertStringToIdentifierInsideCall from './convert-string-to-identifier-inside-call/index.js';
import * as moveLocalOnTop from './move-local-on-top/index.js';
import * as convertConstToLocal from './convert-const-to-local/index.js';
import * as removeUselessIdentifierSuffix from './remove-useless-identifier-suffix/index.js';
import * as convertVarToConst from './convert-var-to-const/index.js';
import * as applyFunctionDeclaration from './apply-function-declaration/index.js';
import * as applyTypes from './apply-types/index.js';
import * as removeUselessDeclarations from './remove-useless-declarations/index.js';
import * as applyWasmImport from './apply-wasm-import/index.js';

export const rules = {
    'apply-data-address-type': applyDataAddressType,
    'apply-function-declaration': applyFunctionDeclaration,
    'apply-wasm-import': applyWasmImport,
    'remove-useless-declarations': removeUselessDeclarations,
    'apply-types': applyTypes,
    'convert-var-to-const': convertVarToConst,
    'remove-useless-identifier-suffix': removeUselessIdentifierSuffix,
    'convert-const-to-local': convertConstToLocal,
    'move-local-on-top': moveLocalOnTop,
    'convert-string-to-identifier-inside-call': convertStringToIdentifierInsideCall,
    'convert-export-memory-to-call': convertExportMemoryToCall,
    'apply-wasm-memory': applyWasmMemory,
    'apply-i32-const': applyI32Const,
    'apply-eq': applyEq,
    'remove-useless-return': removeUselessReturn,
};
