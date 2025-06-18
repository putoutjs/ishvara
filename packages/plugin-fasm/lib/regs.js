const x64 = [
    'rax',
    'rbx',
    'rcx',
    'rdx',
    'rsi',
    'rdi',
    'rbp',
    'rsp',
    'r8',
    'r9',
    'r10',
    'r11',
    'r12',
    'r13',
    'r14',
    'r15',
];

export const REGS_32BIT = [
    'eax',
    'ebx',
    'ecx',
    'edx',
    'esi',
    'edi',
    'ebp',
    'esp',
    'r8d',
    'r9d',
    'r10d',
    'r11d',
    'r12D',
    'r13d',
    'r14d',
    'r15d',
];

const x16 = [
    'ax',
    'bx',
    'cx',
    'dx',
    'si',
    'di',
    'bp',
    'sp',
    'r8w',
    'r9w',
    'r10w',
    'r11w',
    'r12W',
    'r13w',
    'r14w',
    'r15w',
];

export const REGS_8BIT = [
    'al',
    'ah',
    'bl',
    'bh',
    'cl',
    'ch',
    'dl',
    'dh',
    'sil',
    'dil',
    'bpl',
    'spl',
    'r8b',
    'r9b',
    'r10b',
    'r11b',
    'r12B',
    'r13b',
    'r14b',
    'r15b',
];

const segment = [
    // Сегментные регистры
    'cs',
    'ds',
    'es',
    'fs',
    'gs',
    'ss',
];

export const regs = [
    ...x64,
    ...REGS_32BIT,
    ...x16,
    ...REGS_8BIT,
    ...segment,
];

export const isRegister = (a) => regs.includes(a);

export const is8bit = (name) => {
    return REGS_8BIT.includes(name);
};

export const is32bit = (name) => {
    return REGS_32BIT.includes(name);
};
