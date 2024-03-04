import sharp from 'sharp';
import path from 'node:path'
import msg from '../utils/customLog.js';

const convertToWebp = async (args) => {
    const [, filePath, destPath] = args;
    if(!filePath){
        msg.error(`Error: Indica el archivo a compilar`)
        process.exit(1)
    }
    try {
        const file = path.parse(filePath);
        const {ext, name} = file
        const dest = (destPath) ? `${destPath}/${name}.webp` : `${name}.webp`
        sharp(filePath)
        .toFormat('webp')
        .toFile(dest, (err, info)=>{
            if(err){
                msg.error(`Error: ${err}`)
                process.exit(1)
            }else{
                const kb = parseInt(Number(info?.size) / 1000)+'kb'
                msg.success(`La imagen ${name+ext} ha sido convertida con éxito con un peso aprox de ${kb}`)
            }
        })
    } catch (error) {
        msg.error(` ${error}`)
    }
}

export default convertToWebp