import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';
import {operator} from 'putout';

const {remove} = operator;
const SKIP_THIRD_PARTY_MODULES = true;

/**
 * Get the module path based on the base directory.
 * If the path is absolute, return it as is.
 * If the path is relative, resolve it against the base directory.
 * @param filePath The module path to resolve.
 * @param baseDir The base directory to resolve against.
 * @returns The resolved module path.
 */
function resolveModule(filePath, baseDir) {
    return path.isAbsolute(filePath) ? filePath : path.resolve(baseDir, filePath);
}

export const bundle = (entryFile) => {
    const visitedFiles = new Set();
    const output = [];
    
    processFile(visitedFiles, output, entryFile, {
        topLevel: true,
    });
    
    return output.join('\n');
};

/**
 * Recursively process a TypeScript file, resolving and inlining imports.
 * It removes the `export` keyword from the statements and handles third-party modules.
 * @param visitedFiles A set to keep track of visited files to avoid circular dependencies.
 * @param output An array to store the processed source files.
 * @param filePath The path of the TypeScript file to process.
 */
function processFile(visitedFiles, output, filePath, {topLevel}) {
    /**
     * Do nothing if the file has already been visited
     */
    if (visitedFiles.has(filePath))
        return;
    
    visitedFiles.add(filePath);
    
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    
    /**
     * Create a TypeScript source file from the file content
     * This allows us to traverse the AST and manipulate the nodes
     * using TypeScript's API
     */
    const sourceFile = ts.createSourceFile(filePath, fileContent, ts.ScriptTarget.Latest, true);
    
    /**
     * For each statement in the source file, check if its an import. if it is,
     * resolve and inline the module, otherwise, remove the `export` keyword
     */
    sourceFile.statements.forEach((statement) => {
        if (ts.isImportDeclaration(statement) && statement.moduleSpecifier) {
            const moduleName = statement.moduleSpecifier.text;
            
            /**
             * Check if is module from node_modules
             * If is, keep the import statement as is
             * and do not resolve it
             */
            if (SKIP_THIRD_PARTY_MODULES && !moduleName.startsWith('.') && !moduleName.startsWith('/') && !moduleName.startsWith('file:')) {
                // Keep the import statement for node_modules dependencies
                const cleanedStatement = statement.getFullText(sourceFile);
                output.push(cleanedStatement);
                
                return;
            }
            
            const resolvedPath = resolveModule(moduleName + '.ts', path.dirname(filePath));
            
            processFile(visitedFiles, output, resolvedPath, {
                topLevel: false,
            });
        }
        
        if (ts.isExportDeclaration(statement) || ts.isExportAssignment(statement))
            // Skip `export` declarations (e.g., `export { ... }` or `export default`)
            return;
        
        if (ts.isImportDeclaration(statement))
            return;
        
        // Remove only the `export` keyword while preserving the rest
        const cleanedStatement = cleanExportKeyword(statement, sourceFile, {
            topLevel,
        });
        
        output.push(cleanedStatement);
    });
}

/**
 * Remove the `export` keyword from the beginning of a statement
 */
function cleanExportKeyword(statement, sourceFile, {topLevel}) {
    const printer = ts.createPrinter();
    const statementText = printer.printNode(ts.EmitHint.Unspecified, statement, sourceFile);
    
    if (topLevel)
        return statementText;
    
    // Use a regex to remove only the `export` keyword at the beginning of a line or statement
    return statementText
        .replace(/^export\s+/gm, '')
        .trim();
}

