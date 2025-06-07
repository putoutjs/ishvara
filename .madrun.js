import {run} from 'madrun';

export default {
    'test': () => `tape 'packages/**/*.spec.js' 'packages/**/test/*.js' 'example/**/*.spec.ts'`,
    'watch:test': async () => `nodemon -w packages -w test -x "${await run('test')}"`,
    'lint': () => `putout .`,
    'fresh:lint': () => run('lint', '--fresh'),
    'lint:fresh': () => run('lint', '--fresh'),
    'fix:lint': () => run('lint', '--fix'),
    'coverage': async () => `c8 ${await run('test')}`,
    'report': () => 'c8 report --reporter=lcov',
    'build:boot': () => './bin/ishvara.js -t fasm example/fasm/boot/index.js',
    'build:boot:asm': () => './bin/ishvara.js -t asm example/fasm/boot/index.js',
};
