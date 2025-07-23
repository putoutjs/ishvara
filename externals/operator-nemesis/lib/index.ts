import {rb} from '@ishvara/operator-fasm';
const noop = () => {};

type ScreenSize = {
    columns: number[2];
    lines: number[2];
};

type GetsArgs = {
    size: number;
    buffer: rb;
};
type SetColorArgs = {
    color: number;
    background: number;
};

export const nemesis = {
    gets: (getsArgs: GetsArgs) => {},
    printf: (message: number | string | (string | number)[]) => {},
    exec: (name: string) => {},
    clearScreen: noop,
    setScreenSize: (size: ScreenSize) => {},
    setColor: (setColorArgs: SetColorArgs) => {},
    findFirst: (index: number | number[]) => 0,
    findFile: (index: number | number[]) => 0,
};
