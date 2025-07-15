#!/usr/bin/env node

import {readFileSync, writeFileSync} from 'node:fs';
import process from 'node:process';
import {format} from '@ishvara/format-floppy';

const {DEBUG} = process.env;
const bootPath = new URL('../lib/boot/index.bin', import.meta.url).pathname;
const kernelPath = new URL('../lib/kernel.bin', import.meta.url).pathname;
const shellPath = new URL('../data/sh3ll.bin', import.meta.url).pathname;
const imagePath = getImagePath(DEBUG);

const boot = readFileSync(bootPath);
const kernel = readFileSync(kernelPath);
const shell = readFileSync(shellPath);

const files = {
    kernel,
    shell,
};

const floppy = await format({
    boot,
    files,
});

writeFileSync(imagePath, floppy);

function getImagePath(debug) {
    if (debug === '2')
        return new URL('../build/nemesis-debug.img', import.meta.url).pathname;
    
    return new URL('../build/nemesis-small.img', import.meta.url).pathname;
}
