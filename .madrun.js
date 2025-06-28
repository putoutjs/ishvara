import {run} from 'madrun';

export default {
    'test': () => `tape '{packages,externals}/**/*.spec.js' '{packages,externals}/**/test/*.js' 'example/**/*.spec.ts'`,
    'watch:test': async () => `nodemon -w packages -w test -x "${await run('test')}"`,
    'lint': () => `putout .`,
    'fresh:lint': () => run('lint', '--fresh'),
    'lint:fresh': () => run('lint', '--fresh'),
    'fix:lint': () => run('lint', '--fix'),
    'coverage': async () => `c8 ${await run('test')}`,
    'report': () => 'c8 report --reporter=lcov',
    'build:boot': () => run('build:boot:*'),
    'build:boot:fasm': () => ishvara({
        targets: ['fasm'],
        src: 'externals/nemesis/boot/index.js',
    }),
    'build:boot:asm': () => ishvara({
        targets: ['asm'],
        src: 'externals/nemesis/boot/index.js',
    }),
    'build:nemesis': () => run('build:nemesis:*'),
    'build:nemesis:asm': () => ishvara({
        targets: ['asm'],
        src: 'externals/nemesis/kernel.ts',
    }),
    'build:nemesis:fasm': () => ishvara({
        targets: ['fasm'],
        src: 'externals/nemesis/kernel.ts',
    }),
};

function ishvara({targets, src}) {
    const result = [];
    
    for (const target of targets) {
        const cmd = `./bin/ishvara.js -t ${target} ${src}`;
        result.push(cmd);
    }
    
    return result.join('&&');
}
