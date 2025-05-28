import * as removeUselessMov from './remove-useless-mov/index.js';
import * as convertJzToJmp from './convert-jz-to-jmp/index.js';
import * as convertCmpToTest from './convert-cmp-to-test/index.js';
import * as removeUselessRet from './remove-useless-ret/index.js';
import * as removeDuplicateXor from './remove-duplicate-xor/index.js';
import * as convertMovToXor from './convert-mov-to-xor/index.js';

export const rules = {
    'convert-mov-to-xor': convertMovToXor,
    'remove-duplicate-xor': removeDuplicateXor,
    'remove-useless-ret': removeUselessRet,
    'convert-cmp-to-test': convertCmpToTest,
    'convert-jz-to-jmp': convertJzToJmp,
    'remove-useless-mov': removeUselessMov,
};
