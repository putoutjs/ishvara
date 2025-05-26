import {rollup} from 'rollup';
import resolve from '@rollup/plugin-node-resolve';
import tsParser from './ts-parser.js';

const isString = (a) => typeof a === 'string';

export async function bundle(filePath) {
    // create a bundle
    const bundleResult = await rollup({
        input: filePath,
        output: {
            format: 'esm',
        },
        treeshake: false,
        external: [
            '#operator-fasm',
        ],
        plugins: [
            resolve({
                extensions: ['.ts'],
            }),
            tsParser(),
        ],
    });
    
    // an array of file names this bundle depends on
    // console.log(`>> Building ${filePath} from:`, bundleResult.watchFiles);
    // generate output specific code in-memory
    // you can call this function multiple times on the same bundle object
    const {output} = await bundleResult.generate({});
    const outputContent = [];
    
    for (const chunkOrAsset of output) {
        if (chunkOrAsset.type === 'asset') {
            // For assets, this contains
            // {
            //   fileName: string,              // the asset file name
            //   source: string | Uint8Array    // the asset source
            //   type: 'asset'                  // signifies that this is an asset
            // }
            const {source} = chunkOrAsset;
            
            outputContent.push(isString(source) ? source : Buffer
                .from(source)
                .toString('utf8'));
        } else {
            // For chunks, this contains
            // {
            //   code: string,                  // the generated JS code
            //   dynamicImports: string[],      // external modules imported dynamically by the chunk
            //   exports: string[],             // exported variable names
            //   facadeModuleId: string | null, // the id of a module that this chunk corresponds to
            //   fileName: string,              // the chunk file name
            //   implicitlyLoadedBefore: string[]; // entries that should only be loaded after this chunk
            //   imports: string[],             // external modules imported statically by the chunk
            //   importedBindings: {[imported: string]: string[]} // imported bindings per dependency
            //   isDynamicEntry: boolean,       // is this chunk a dynamic entry point
            //   isEntry: boolean,              // is this chunk a static entry point
            //   isImplicitEntry: boolean,      // should this chunk only be loaded after other chunks
            //   map: string | null,            // sourcemaps if present
            //   modules: {                     // information about the modules in this chunk
            //     [id: string]: {
            //       renderedExports: string[]; // exported variable names that were included
            //       removedExports: string[];  // exported variable names that were removed
            //       renderedLength: number;    // the length of the remaining code in this module
            //       originalLength: number;    // the original length of the code in this module
            //       code: string | null;       // remaining code in this module
            //     };
            //   },
            //   name: string                   // the name of this chunk as used in naming patterns
            //   referencedFiles: string[]      // files referenced via import.meta.ROLLUP_FILE_URL_<id>
            //   type: 'chunk',                 // signifies that this is a chunk
            // }
            outputContent.push(chunkOrAsset.code);
        }
    }
    
    await bundleResult.close();
    return outputContent.join('');
}
