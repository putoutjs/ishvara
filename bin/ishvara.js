#!/usr/bin/env node

import {writeFileSync} from 'node:fs';
import process from 'node:process';
import {stat} from 'node:fs/promises';
import {join} from 'node:path';
import * as path from 'node:path';
import {codeFrameColumns} from '@putout/babel';
import chalk from 'chalk';
import {run} from '#runner-wasm';
import {parseArgs, validateArgs} from '#cli-args';
import {help} from '#cli-help';
import * as ishvara from '#ishvara';
import {bundle} from '../packages/bundler/index.js';

const {O = 1, RAW} = process.env;
const args = parseArgs(process.argv.slice(2));

if (args.help) {
    console.log(help());
    process.exit(0);
}

await validateArgs(args, {
    log: (a) => console.error(chalk.red(a)),
    exit: process.exit,
    stat,
});

const [name] = args._;
const [error, source] = await bundle(name);

if (error) {
    const {line} = error.loc || {
        line: 0,
    };
    
    const {id} = error;
    
    console.error(`file://${chalk.blue(id)}:${line}: ${chalk.red(error.message)}`);
    process.exit(1);
}

if (args.output === 'bundle') {
    if (RAW)
        console.log(source);
    else
        console.log(codeFrameColumns(source, {}, {
            highlightCode: true,
            forceColor: true,
        }));
    
    process.exit();
}

const [binary, compilePlaces] = await ishvara.compile(source, {
    name,
    type: args.output,
    target: args.target,
    optimization: Boolean(Number(O)),
});

if (compilePlaces.length) {
    console.error(compilePlaces);
    process.exit(1);
}

if (args.output) {
    if (args.output === 'binary' || RAW)
        process.stdout.write(binary);
    else
        console.log(codeFrameColumns(binary, {}, {
            highlightCode: true,
            forceColor: true,
        }));
    
    process.exit();
}

if (!args.output)
    if (args.target === 'fasm') {
        write(name, 'bin', binary);
    } else if (args.target === 'wasm') {
        write(name, 'wasm', binary);
        
        const y = run(binary, {
            console: {
                log: (a) => {
                    console.log('wasm:', a);
                    return a;
                },
            },
        });
        
        if (y.x)
            console.log('js', y.x(1, 2));
    }

if (args.target === 'wast')
    write(name, 'wast', binary);
else if (args.target === 'asm')
    write(name, 'asm', binary);

process.exit(0);

function write(input, extension, binary) {
    const {dir, name} = path.parse(input);
    const full = `${join(dir, name)}.${extension}`;
    
    writeFileSync(full, binary);
}
