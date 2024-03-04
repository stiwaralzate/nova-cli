import { exec } from 'node:child_process'
import path from 'node:path'
import msg from '../utils/customLog.js';

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
        });
    } catch (error) {
        msg.error(` Error: ${error}`)
    }
    
}

export default minifyFile