import inquirer from "inquirer";
import fs from 'node:fs/promises'
import path from "node:path";
import { fileURLToPath } from 'url';
import msg from "../utils/customLog.js";

const importTool = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const toolsPath = __dirname+'/tools';
    let toolsFiles = (await fs.readdir(toolsPath))
    let toolsMap = Promise.all(toolsFiles.map( async (file)=>{
        let check = (await fs.stat(`${toolsPath}/${file}`)).isFile()
        return (check) ? file : null
    } ))
    let toolsFilter = (await toolsMap).filter(e => e)
    inquirer
        .prompt([
            {
                type: "list",
                name: "toolList",
                message: "¿Que herramienta deseas importar?",
                choices: toolsFilter
            }
        ])
        .then(async (answers) => {
            if (answers?.toolList) {
                try {
                    const fileToImport = await fs.readFile(`${toolsPath}/${answers?.toolList}`)
                    await fs.writeFile(`./${answers?.toolList}`, fileToImport)
                    msg.success(`Se ha importado el archivo ${answers?.toolList} exitosamente!`)
                } catch (error) {
                    msg.error(`Error: el archivo no se ha importado. ${error}`)
                }
            }
        })
        .catch((error) => {
            if (error.isTtyError) {
                // Prompt couldn't be rendered in the current environment
            } else {
                // Something else went wrong
            }
            console.log(error)

        });
}

export default importTool