import path from 'node:path'
import fs from 'node:fs/promises';
import msg from '../utils/customLog.js'
import * as sass from 'sass'

/**
 * 
 * @param {Array} args 
 */

const compileSass = async (args)=>{
    const [, filePath, destPath] = args;
    if(!filePath){
        msg.error(` Error: Indica el archivo a compilar`)
        process.exit(1)
    }

    try {
        const file = path.parse(filePath);
        const {ext, name} = file
        const dest = (destPath) ? `${destPath}/${name}.css` : `${name}.css`
        const response = sass.compile(filePath)
        
        if(response?.css){
            await fs.writeFile(dest, response.css)
            msg.success(` El archivo ${name+ext} ha sido compilado con éxito en ${dest}`)
        }
    } catch (error) {
        msg.error(` Error en el proceso ${error}`)
    }
}

export default compileSass