import {operator, types} from 'putout';

const {
    replaceWithMultiple,
    remove,
} = operator;

const {blockStatement} = types;

export const report = () => `Move functions before section 'data'`;

export const fix = ({label, fns}) => {
    label.node.body = blockStatement([]);
    const nodes = [];
    
    for (const fn of fns) {
        nodes.push(fn.node);
        remove(fn);
    }
    
    replaceWithMultiple(label, nodes);
};
export const traverse = ({store, pathStore, push}) => ({
    LabeledStatement(path) {
        const {name} = path.node.label;
        
        if (name === 'section')
            store('label', path);
    },
    FunctionDeclaration: (path) => {
        pathStore(path);
    },
    Program: {
        exit(path) {
            const [label] = store();
            const fns = pathStore();
            
            if (!label)
                return;
            
            if (!fns.length)
                return;
            
            push({
                path,
                label,
                fns,
            });
        },
    },
});
