const PREFIX = '__ishvara_';

export const report = ({name, newName}) => `Add prefix to label: '${name}' -> '${newName}'`;

export const fix = ({newName, path, ids}) => {
    path.node.label.name = newName;
    
    for (const {node} of ids) {
        node.name = newName;
    }
};

export const traverse = ({push}) => ({
    LabeledStatement(path) {
        const ids = [];
        const {name} = path.node.label;
        
        if (name.startsWith(PREFIX))
            return;
        
        const newName = `${PREFIX}${name}`;
        
        path
            .scope
            .getProgramParent()
            .path
            .traverse({
                Identifier(path) {
                    if (name === path.node.name)
                        ids.push(path);
                },
            });
        
        push({
            path,
            ids,
            name,
            newName,
        });
    },
});
