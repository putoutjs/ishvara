import * as removeUselessRet from './remove-useless-ret/index.js';
import * as removeDuplicateXor from './remove-duplicate-xor/index.js';
import * as convertMovToXor from './convert-mov-to-xor/index.js';

export const rules = {
    'convert-mov-to-xor': convertMovToXor,
    'remove-duplicate-xor': removeDuplicateXor,
    'remove-useless-ret': removeUselessRet,
};
