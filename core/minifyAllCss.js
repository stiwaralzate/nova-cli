import msg from '../utils/customLog.js';
import path from 'node:path'
import getFilesByPath from '../utils/getFilesByPath.js';
import { minify } from 'minify';
import fs from 'node:fs/promises';


/**
 * 
 * @param {Array} args 
 */

const minifyAllCss = async (args) => {
    const [, , destPath] = args;
    try {
        let files = await getFilesByPath()
        let cssFiles = files.filter(e => e).filter(e => e.endsWith('.css') && !e.endsWith('min.css'))
        cssFiles.forEach( async fileName => {
            const file = path.parse(fileName)
            const { ext, name } = file
            const dest = (destPath) ? `${destPath}/${name}.min${ext}` : `${name}.min${ext}`
            const response = await minify(fileName)
        
            if(response){
                await fs.writeFile(dest, response)
                msg.success(`Archivo ${name}${ext} minificado correctamente en ${dest}`)
            }else{
                msg.error(`El archivo ${name+ext} no se ha minificado`)
            }
        })
    } catch (error) {
        msg.error(`Error: ${error}`)
    }
}

export default minifyAllCss