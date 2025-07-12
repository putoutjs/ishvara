#!/usr/bin/env node

import {readFileSync, writeFileSync} from 'node:fs';
import {format} from '@ishvara/format-floppy';

const bootPath = new URL('../lib/boot/index.bin', import.meta.url).pathname;
const kernelPath = new URL('../lib/kernel.bin', import.meta.url).pathname;
const imagePath = new URL('../build/nemesis-small.img', import.meta.url).pathname;

const boot = readFileSync(bootPath);
const kernel = readFileSync(kernelPath);

const files = {
    kernel,
};

const floppy = await format({
    boot,
    files,
});

writeFileSync(imagePath, floppy);
