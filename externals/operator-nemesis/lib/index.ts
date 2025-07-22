const noop = () => {};

type ScreenSize = {
    columns: number[2];
    lines: number[2];
};
type GetsArgs = {
    size: number;
    buffer: number;
};
type SetColorArgs = {
    color: number;
    background: number;
};

export type rb = number;

export type i16 = number;

export const nemesis = {
    gets: (getsArgs: GetsArgs) => {},
    printf: (message: string | (string | number)[]) => {},
    clearScreen: noop,
    setScreenSize: (size: ScreenSize) => {},
    setColor: (setColorArgs: SetColorArgs) => {},
    findFirst: (index: number | number[]) => 0,
};
