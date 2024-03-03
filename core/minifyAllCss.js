import fs from 'node:fs/promises'
import msg from '../utils/customLog.js';
import { exec } from 'node:child_process'
import path from 'node:path'

/**
 * 
 * @param {String} destPath 
 */

const minifyAllCss = async (destPath) => {
    const __dirname = process.cwd();
    let jsFilesPath = (await fs.readdir(__dirname))
    let jsFilesMap = Promise.all(jsFilesPath.map( async (file)=>{
        let check = (await fs.stat(`${__dirname}/${file}`)).isFile()
        return (check) ? file : null
    } ))
    
    let jsFilesFilter = (await jsFilesMap).filter(e => e).filter(e => e.endsWith('.css') && !e.endsWith('min.css'))
    jsFilesFilter.forEach( fileName => {
        const file = path.parse(fileName)
        const { ext, name } = file
        const dest = (destPath) ? `${destPath}/${name}.min${ext}` : `${name}.min${ext}`
        const script = `minify ${fileName} > ${dest}`
        exec(script, (error, stdout, stderr) => {
            if (error) {
                msg.error(` Error al ejecutar el comando: ${error.message}`);
                process.exit(1);
            }
            if (stderr) {
                msg.error(` Error en la salida estándar: ${stderr}`);
                process.exit(1);
            }
        });
        msg.success(` Archivo ${name}${ext} minificado correctamente en ${dest}`)
    })
    process.exit(1)
}

export default minifyAllCss