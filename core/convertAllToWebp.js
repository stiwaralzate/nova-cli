import sharp from 'sharp';
import path from 'node:path'
import msg from '../utils/customLog.js';
import getFilesByPath from '../utils/getFilesByPath.js';


const convertAllToWebp = async (args) => {
    const [, , destPath] = args;
    
    try {
        let files = await getFilesByPath();
        let images = files.filter(e => e).filter(e => e.endsWith('jpg') || e.endsWith('jpeg') )
    
        images.forEach( fileName => {
            const file = path.parse(fileName)
            const { ext, name } = file
            const dest = (destPath) ? `${destPath}/${name}.webp` : `${name}.webp`
            sharp(fileName)
            .toFormat('webp')
            .toFile(dest, (err, info)=>{
                if(err){
                    msg.error(`Error: ${err}`)
                }else{
                    const kb = parseInt(Number(info?.size) / 1000)+'kb'
                    msg.success(`La imagen ${name+ext} ha sido convertida con éxito con un peso aprox de ${kb}`)
                }
            })
        })
        
    } catch (error) {
        msg.error(`Error: ${error}`)
    }
    
}

export default convertAllToWebp