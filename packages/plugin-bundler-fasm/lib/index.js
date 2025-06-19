import * as replaceSectionDataWithLet from './replace-section-data-with-let/index.js';
import * as replaceSectionConstWithEqu from './replace-section-const-with-equ/index.js';
import * as replaceSectionCodeWithFunctions from './replace-section-code-with-functions/index.js';

export const rules = {
    'replace-section-code-with-functions': replaceSectionCodeWithFunctions,
    'replace-section-const-with-equ': replaceSectionConstWithEqu,
    'replace-section-data-with-let': replaceSectionDataWithLet,
};
