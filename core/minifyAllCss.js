import msg from '../utils/customLog.js';
import { exec } from 'node:child_process'
import path from 'node:path'
import getFilesByPath from '../utils/getFilesByPath.js';

/**
 * 
 * @param {Array} args 
 */

const minifyAllCss = async (args) => {
    const [, , destPath] = args;
    try {
        let files = await getFilesByPath()
        let cssFiles = files.filter(e => e).filter(e => e.endsWith('.css') && !e.endsWith('min.css'))
        cssFiles.forEach( fileName => {
            const file = path.parse(fileName)
            const { ext, name } = file
            const dest = (destPath) ? `${destPath}/${name}.min${ext}` : `${name}.min${ext}`
            const script = `minify ${fileName} > ${dest}`
            exec(script, (error, stdout, stderr) => {
                if (error) {
                    msg.error(`Error al ejecutar el comando: ${error.message}`);
                    process.exit(1);
                }
                if (stderr) {
                    msg.error(`Error en la salida estándar: ${stderr}`);
                    process.exit(1);
                }
            });
            msg.success(`Archivo ${name}${ext} minificado correctamente en ${dest}`)
        })
    } catch (error) {
        msg.error(`Error: ${error}`)
    }
}

export default minifyAllCss