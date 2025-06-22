import {translate} from '#translator-wasm';
import {transform} from '#transformer-wasm';
import {print} from '#printer-wasm';
import {optimize} from '#optimizer-wasm';

const noop = () => {};

export const compile = async (source, options = {}) => {
    const {
        name,
        type = 'binary',
        onStageChange = noop,
    } = options;
    
    const emitStateChange = (a) => onStageChange(a, {
        last: false,
        places: [],
    });
    
    const emitLastStateChange = (a) => onStageChange(a, {
        last: true,
        places: [],
    });
    
    const emitErrorStateChange = (a, places) => onStageChange(a, {
        last: true,
        places,
    });
    
    const [code, compilePlaces] = transform(source);
    
    if (compilePlaces.length) {
        emitErrorStateChange('Transform', compilePlaces);
        return [code, compilePlaces];
    }
    
    if (type === 'code') {
        emitLastStateChange('Transform');
        return [code, compilePlaces];
    }
    
    emitStateChange('Transform');
    const [optimized, optimizedPlaces] = optimize(code);
    
    if (/optimize/.test(type)) {
        emitLastStateChange('Optimize');
        return [optimized, optimizedPlaces];
    }
    
    emitStateChange('Optimize');
    const assembly = print(optimized);
    
    if (type === 'assembly')
        return [
            assembly,
            [],
        ];
    
    emitStateChange('Print');
    const [binary, places] = await translate(assembly, {
        name,
        type,
    });
    
    if (places.length) {
        emitErrorStateChange('Translate', places);
        
        return [binary, places];
    }
    
    emitStateChange('Translate');
    return [binary, places];
};
