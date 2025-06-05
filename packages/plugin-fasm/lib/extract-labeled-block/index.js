import {types} from 'putout';

const {isProgram} = types;

export const report = (path) => {
    const {name} = path.node.label;
    
    return `Extract 'labeled' block: '${name}'`;
};

export const match = () => ({
    '__a: {__body}': (vars, path) => {
        const {parentPath} = path;
        
        return !isProgram(parentPath);
    },
});

export const replace = () => ({
    '__a: {__body}': ({__body}, path) => {
        const [first, ...other] = __body.body;
        const index = path.parentPath.node.body.indexOf(path.node);
        
        path.node.body = first;
        path.parentPath.node.body.splice(index + 1, 0, ...other);
        
        return path;
    },
});
