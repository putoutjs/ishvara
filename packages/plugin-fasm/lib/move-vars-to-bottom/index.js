import {operator, types} from 'putout';

const {
    isArrayExpression,
    isFunction,
    isBlockStatement,
    isExportNamedDeclaration,
} = types;

const {remove} = operator;

export const report = () => `Move 'var' to bottom of the file`;

export const fix = (path) => {
    delete path.node.leadingComments;
    delete path.node.trailingComments;
    
    path.parentPath.node.body.push(path.node);
    remove(path);
};
export const traverse = ({push}) => ({
    VariableDeclaration(path) {
        if (isExportNamedDeclaration(path.parentPath))
            return;
        
        if (isFunction(path.parentPath.parentPath))
            return;
        
        if (isBlockStatement(path.parentPath))
            return;
        
        const prev = path.getPrevSibling();
        const {init} = path.node.declarations[0];
        
        if (isArrayExpression(init))
            return;
        
        if (!prev.node)
            push(path);
    },
});
