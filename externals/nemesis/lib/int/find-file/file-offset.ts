let file_offset: i16 = 0;

export const getFileOffset = () => {
    return [file_offset];
};

export const setFileOffset = () => {
    [file_offset] = ax;
};
