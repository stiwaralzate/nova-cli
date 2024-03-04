import fs from 'node:fs/promises'

const getFilesByPath = async ()=>{
    const __dirname = process.cwd();
    let FilesPath = (await fs.readdir(__dirname))
    let FilesMap = Promise.all(FilesPath.map( async (file)=>{
        let check = (await fs.stat(`${__dirname}/${file}`)).isFile()
        return (check) ? file : null
    } ))

    return FilesMap
}

export default getFilesByPath