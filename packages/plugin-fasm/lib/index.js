import * as removeUselessDeclarations from './remove-useless-declarations/index.js';
import * as addLabelPrefix from './add-label-prefix/index.js';
import * as convertDeclarationToToMov from './convert-declaration-to-mov/index.js';
import * as convertMovToAdd from './convert-mov-to-add/index.js';
import * as convertReturnToEax from './convert-return-to-eax/index.js';
import * as applyInc from './apply-inc/index.js';
import * as convertVarToDb from './convert-var-to-db/index.js';
import * as moveVarsToBottom from './move-vars-to-bottom/index.js';
import * as convEquCallToMember from './convert-equ-call-to-member/index.js';
import * as convertDecToHex from './convert-dec-to-hex/index.js';
import * as convertAssignToMember from './convert-assign-to-member/index.js';
import * as convertAssignToAdd from './convert-assign-to-add/index.js';
import * as convertAssignToMov from './convert-assign-to-mov/index.js';
import * as convertAssignToXor from './convert-assign-to-xor/index.js';
import * as convertAssignToShl from './convert-assign-to-shl/index.js';
import * as convertAwaitToCall from './convert-await-to-call/index.js';
import * as splitStackOperations from './split-stack-operations/index.js';
import * as convertFunctionToLabel from './convert-function-to-label/index.js';

export const rules = {
    'move-vars-to-bottom': moveVarsToBottom,
    'convert-vars-to-db': convertVarToDb,
    'convert-dec-to-hex': convertDecToHex,
    'convert-equ-call-to-member': convEquCallToMember,
    'convert-assign-to-member': convertAssignToMember,
    'convert-assign-to-add': convertAssignToAdd,
    'convert-assign-to-mov': convertAssignToMov,
    'convert-assign-to-xor': convertAssignToXor,
    'convert-assign-to-shl': convertAssignToShl,
    'convert-function-to-label': convertFunctionToLabel,
    'convert-await-to-call': convertAwaitToCall,
    'split-stack-operations': splitStackOperations,
    'apply-inc': applyInc,
    'convert-return-to-eax': convertReturnToEax,
    'convert-mov-to-add': convertMovToAdd,
    'convert-declaration-to-mov': convertDeclarationToToMov,
    'add-label-prefix': addLabelPrefix,
    'remove-useless-declarations': removeUselessDeclarations,
};
