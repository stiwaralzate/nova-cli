import { exec } from 'node:child_process'
import path from 'node:path'
import msg from '../utils/customLog.js';
import minifyAllScripts from './minifyAllScripts.js';
import minifyAllCss from './minifyAllCss.js';

/**
 * 
 * @param {Array} args 
 */

const minifyFile = async (args) => {
    const [, filePath, destPath] = args;
    
    if (!filePath) {
        msg.error(`Error: Indica el archivo a minificar`)
        process.exit(1)
    }
    
    if(filePath === '-js'){
        minifyAllScripts(destPath)
        return;
    }

    if(filePath === '-css'){
        minifyAllCss(destPath)
        return;
    }
    
    const file = path.parse(filePath);
    const { ext, name } = file
    const dest = (destPath) ? `${destPath}/${name}.min${ext}` : `${name}.min${ext}`
    const script = `minify ${filePath} > ${dest}`
    exec(script, (error, stdout, stderr) => {
        if (error) {
            msg.error(` Error al ejecutar el comando: ${error.message}`);
            process.exit(1);
        }
        if (stderr) {
            msg.error(` Error en la salida estándar: ${stderr}`);
            process.exit(1);
        }
        msg.success(` Archivo ${name}${ext} minificado correctamente en ${dest}`)
        process.exit(1)
    });
}

export default minifyFile