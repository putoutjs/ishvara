import {operator} from 'putout';

const {remove, insertAfter} = operator;

export const report = () => `Move 'equ' to bottom`;

export const fix = ({path, last}) => {
    const {node} = path.parentPath;
    const programPath = path.scope.getProgramParent().path;
    
    programPath.node.body.push(node);
    remove(path.parentPath);
};

export const traverse = ({listStore, push}) => ({
    '__a.equ[__b]': listStore,
    'Program': {
        exit() {
            const all = listStore();
            
            if (!all.length)
                return;
            
            const last = getLast(all);
            
            for (const path of all) {
                const prev = path.parentPath.getPrevSibling();
                
                if (prev.node)
                    continue;
                
                push({
                    path,
                    last,
                });
            }
        },
    },
});

function getLast(all) {
    const lastEqu = all.at(-1);
    const last = lastEqu.parentPath.getNextSibling();
    
    if (last.node)
        return last;
    
    return lastEqu;
}

