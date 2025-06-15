import {operator} from 'putout';

const {remove, insertAfter} = operator;

export const report = () => `Move 'equ' to end`;

export const fix = ({path, last}) => {
    const {node} = path;
    insertAfter(last, node);
    remove(path);
};

export const traverse = ({listStore, push}) => ({
    '__a.equ[__b]': listStore,
    'Program': {
        exit() {
            const all = listStore();
            const last = all.at(-1);
            
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
