import {createTest} from '@putout/test';
import * as plugin from './index.js';
import * as applyRegisters from '../apply-registers/index.js';
import * as removeUselessBraces from '../remove-useless-braces/index.js';
import * as convertFunctionToLabel from '../convert-function-to-label/index.js';
import * as convertPrintLineToInt10 from '../convert-bios-print-line-to-int-10/index.js';
import * as convertReturnToEax from '../convert-return-to-eax/index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-arguments-to-registers', plugin],
    ],
});

test('fasm: convert-arguments-to-registers: report', (t) => {
    t.report('convert-arguments-to-registers', `Use 'regs' instead of 'args'`);
    t.end();
});

test('fasm: convert-arguments-to-registers: transform', (t) => {
    t.transform('convert-arguments-to-registers', {
        removeUselessBraces,
        applyRegisters,
    });
    t.end();
});

test('fasm: convert-arguments-to-registers: transform: return', (t) => {
    t.transform('return', {
        convertFunctionToLabel,
    });
    t.end();
});

test('fasm: convert-arguments-to-registers: transform: early-return', (t) => {
    t.transform('early-return', {
        convertFunctionToLabel,
        convertPrintLineToInt10,
        convertReturnToEax,
    });
    t.end();
});
