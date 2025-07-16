import {run} from 'madrun';

export default {
    'prepublishOnly': () => run(['lint', 'test']),
    'test': () => `tape 'test/*.*' 'lib/**/*.spec.*'`,
    'watch:test': async () => `nodemon -w lib -x "${await run('test')}"`,
    'lint': () => 'putout .',
    'fresh:lint': async () => await run('lint', '--fresh'),
    'lint:fresh': async () => await run('lint', '--fresh'),
    'fix:lint': async () => await run('lint', '--fix'),
    'coverage': async () => `c8 ${await run('test')}`,
    'report': () => 'c8 report --reporter=lcov',
    'build': () => {
        return [
            '../ishvara/bin/ishvara.js -t fasm lib/kernel.ts',
            '../ishvara/bin/ishvara.js -t fasm lib/boot/index.js',
            '../ishvara/bin/ishvara.js -t fasm lib/shell/shell.ts',
            './scripts/build.js',
            'cp ./build/* ~/nemesis-emulator/',
        ].join(' && ');
    },
    'build:debug': async () => [
        await run('build'), {
            DEBUG: '2',
        }],
    'build:all': async () => await run(['build', 'build:debug']),
};
