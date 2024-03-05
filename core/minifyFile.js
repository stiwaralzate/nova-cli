import fs from 'node:fs/promises';
import path from 'node:path'
import msg from '../utils/customLog.js';
import { minify } from 'minify';

/**
 * 
 * @param {Array} args 
 */

const minifyFile = async (args) => {
    const [, filePath, destPath] = args;
    
    if (!filePath) {
        msg.error(` Error: Indica el archivo a minificar`)
        process.exit(1)
    }

    try {
        const file = path.parse(filePath);
        const { ext, name } = file
        const dest = (destPath) ? `${destPath}/${name}.min${ext}` : `${name}.min${ext}`
        const response = await minify(filePath)
        
        if(response){
            await fs.writeFile(dest, response)
            msg.success(`El archivo ${name+ext} ha sido compilado con éxito en ${dest}`)
        }
        
    } catch (error) {
        msg.error(` Error: ${error}`)
    }
    
}

export default minifyFile