#!/usr/bin/env node

import clearConsole from './utils/clearConsole.js'
import init from './core/init.js'
import msg from './utils/customLog.js'
import { commands } from './core/commandsList.js'
import createTable from './utils/tableGenerator.js'
import minifyFile from './core/minifyFile.js'

const [,,...args] = process.argv


if(!Object.keys(commands).includes(args[0])){
    msg.error(`Error: Comando no encontrado - Revisa el comando ingresado, si deseas ver los comandos disponibles puedes ejecutar nova -h o nova -help`);
    process.exit(1)
}

switch(args[0]){
    case '-l':
    case '-list':
        const CATEGORY = args[1]

        if(!CATEGORY){
            msg.error(`Error: Indica la categoria`);
            process.exit(1)
        }

        clearConsole()
        msg.info(`Listado de comandos para ${CATEGORY} \n`)
        createTable(['comando', 'descripcion'], [['-l | -list', 'lorem'], ['-h | -help', 'help']])
    break;
    case '-h':
    case '-help':
        clearConsole()
        msg.info(`Listado de ayuda \n`)
        createTable(['comando', 'descripcion'], [['-l | -list', 'lorem'], ['-h | -help', 'help']])
    break;
    case '-m':
        minifyFile(args)
    break;
    default:
        msg.error(`Error: Comando no encontrado - Revisa el comando ingresado, si deseas ver los comandos disponibles puedes ejecutar nova -h o nova -help`);
    break;
}
