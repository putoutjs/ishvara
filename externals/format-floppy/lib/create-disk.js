import {readFile} from 'node:fs/promises';
import {unzip} from 'node:zlib';
import {promisify} from 'node:util';
import {FatFsDisk} from 'fatfs-wasm';

const extract = promisify(unzip);

export const createDisk = async () => {
    const packed = await readFile(new URL('../data/fat-small.img.zip', import.meta.url).pathname);
    const data = await extract(packed);
    const disk = await FatFsDisk.create(data);
    
    disk.mount();
    
    return {
        disk,
        data,
    };
};

