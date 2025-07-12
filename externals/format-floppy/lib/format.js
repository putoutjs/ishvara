import {createDisk} from './create-disk.js';

const {entries} = Object;

export const format = async ({boot, files = {}}) => {
    const {disk, data} = await createDisk();
    
    for (const [name, buffer] of entries(files)) {
        disk.writeFile(`/${name}`, buffer);
    }
    
    disk.unmount();
    
    if (boot)
        data.copy(boot);
    
    return data;
};

