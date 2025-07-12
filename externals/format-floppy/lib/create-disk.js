import {FatFsDisk} from 'fatfs-wasm';

const {assign} = Object;

export const createDisk = (data) => {
    const result = {};
    
    assign(result, {
        [Symbol.asyncDispose]() {
            this.disk.unmount();
        },
        async use() {
            this.disk = await FatFsDisk.create(data);
            this.disk.mount();
            
            return this.disk;
        },
    });
    
    return result;
};

