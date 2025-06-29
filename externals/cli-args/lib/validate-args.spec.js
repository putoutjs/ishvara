import {test, stub} from 'supertape';
import {validateArgs} from './validate-args.js';

test('ishvara: cli-args: exit', async (t) => {
    const exit = stub();
    const log = stub();
    const stat = stub().throws(Error('not found'));
    
    const args = {
        _: '',
        target: 'wasm',
    };
    
    await validateArgs(args, {
        exit,
        log,
        stat,
    });
    
    t.calledWith(exit, [1]);
    t.end();
});

test('ishvara: cli-args: log', async (t) => {
    const exit = stub();
    const log = stub();
    const stat = stub().throws(Error('not found'));
    
    const args = {
        _: 'xxxx',
        target: 'wasm',
    };
    
    await validateArgs(args, {
        exit,
        log,
        stat,
    });
    
    t.calledWith(log, ['not found']);
    t.end();
});
