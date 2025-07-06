import {types} from 'putout';

const {
    isProgram,
    isBlockStatement,
    isLabeledStatement,
} = types;

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
    '__a: __b: {__body}': ({__body}, path) => {
        const [first, ...other] = __body.body;
        
        if (!isBlockStatement(first)) {
            path.node.body.body = first;
            extractBody(path, other);
        }
        
        return path;
    },
    '__a: {__body}': ({__body}, path) => {
        if (isLabeledStatement(path.parentPath))
            return path;
        
        const [first, ...other] = __body.body;
        
        path.node.body = first;
        extractBody(path, other);
        
        return path;
    },
});

function extractBody(path, other) {
    const index = path.parentPath.node.body.indexOf(path.node);
    const {body} = path.parentPath.node;
    
    body.splice(index + 1, 0, ...other);
}
