import {setLine} from './position/line.ts';
import {setColumn} from './position/column.ts';

export async function clearScreen<es, ax, di>() {
    ax = 0xb800;
    es = ax;
    ax = 0;
    ah = [bgcolor];
    ah <<= 4;
    ah = [textcolor];
    di = 0;
    cx = 25 * 80;
    rep.stosw();
    bx = 0;
    
    await setLine();
    await setColumn();
}
