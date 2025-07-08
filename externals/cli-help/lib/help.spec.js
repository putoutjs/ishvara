import {test} from 'supertape';
import {help} from './help.js';

test('ishvara: cli-help', (t) => {
    const result = help();
    
    t.match(result, 'Usage');
    t.end();
});

