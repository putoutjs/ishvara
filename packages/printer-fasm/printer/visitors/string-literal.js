export const StringLiteral = (path, {write}, semantics) => {
    const {value, raw = `'${value}'`} = path.node;
    
    if (path.parentPath.isJSXAttribute()) {
        write(raw);
        return;
    }
    
    const newValue = raw.slice(1, -1);
    write.quote();
    write(maybeEscape(newValue, semantics));
    write.quote();
};

const maybeEscape = (value, {escapeDoubleQuote, escapeSingleQuote}) => {
    const list = value.split('');
    const slash = `\\`;
    
    if (escapeSingleQuote)
        return escape(list, {
            slash,
            quote: `'`,
        });
    
    if (escapeDoubleQuote)
        return escape(list, {
            slash,
            quote: `"`,
        });
    
    return value;
};

const escape = (list, {slash, quote}) => {
    const result = [];
    
    for (const char of list) {
        if (char === slash) {
            result.push(quote);
            continue;
        }
        
        result.push(char);
    }
    
    return result.join('');
};
