import * as convertSetColorTo0xff from './convert-set-color-to-0xff/index.js';
import * as convertDebugToPrintf from './convert-debug-to-printf/index.js';
import * as convertFindFileToInt0xff from './convert-find-file-to-int-0xff/index.js';
import * as convertReadSectorToInt0xff from './convert-read-sector-to-int-0xff/index.js';
import * as convertExecToInt0xff from './convert-exec-to-int-0xff/index.js';
import * as convertSetCursorToInt0xff from './convert-set-cursor-to-int-0xff/index.js';
import * as removeUselessImports from './remove-useless-imports/index.js';
import * as convertPrintfToInt0xff from './convert-printf-to-int-0xff/index.js';

export const rules = {
    'convert-printf-to-int-0xff': convertPrintfToInt0xff,
    'remove-useless-imports': removeUselessImports,
    'convert-set-cursor-to-int-0xff': convertSetCursorToInt0xff,
    'convert-exec-to-int-0xff': convertExecToInt0xff,
    'convert-read-sector-to-int-0xff': convertReadSectorToInt0xff,
    'convert-find-file-to-int-0xff': convertFindFileToInt0xff,
    'convert-debug-to-printf': convertDebugToPrintf,
    'convert-set-color-to-0xff': convertSetColorTo0xff,
};
