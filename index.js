#!/usr/bin/env node

import clearConsole from './utils/clearConsole.js'
import init from './core/init.js'
import msg from './utils/customLog.js'
import { commands } from './core/commandsList.js'
import createTable from './utils/tableGenerator.js'
import minifyFile from './core/minifyFile.js'
import importTool from './core/importTool.js'
import compileSass from './core/CompileSass.js'
import convertToWebp from './core/convertToWebp.js'
import convertAllToWebp from './core/convertAllToWebp.js'
import minifyAllScripts from './core/minifyAllScripts.js'
import minifyAllCss from './core/minifyAllCss.js'

const [,,...args] = process.argv
const subcommand = args[1]
const subcommands = commands[args[0]]?.subcommands

if(!Array.isArray(args) || args.length === 0){
    clearConsole()
    msg.welcome()
    process.exit(1)
}


if(!Object.keys(commands).includes(args[0])){
    msg.error(`Error: Comando no encontrado - Revisa el comando ingresado, si deseas ver los comandos disponibles puedes ejecutar nova -h o nova -help`);
    process.exit(1)
}

switch(args[0]){
    case '-l':
    case '-list':
        if(!subcommand || (subcommands && !subcommands.includes(subcommand))){
            msg.error(`Error: Indica una categoría valida`);
            process.exit(1)
        }

        clearConsole()
        msg.info(`Listado de comandos para ${subcommand} \n`)
        createTable(['Herramienta', 'Descripción'], [['fetch', 'TODO realizar fetch del listado de herramientas']])
    break;
    case '-h':
    case '-help':
        clearConsole()
        msg.info(`Listado de ayuda \n`)
        createTable(['Comando', 'Descripción'], [['-l | -list', 'lorem'], ['-h | -help', 'help']])
    break;
    case '-m':
        if(subcommand === '-js'){
            minifyAllScripts(args)
        }else if(subcommand === '-css'){
            minifyAllCss(args)
        }else{
            minifyFile(args)
        }
    break;
    case 'use':
        importTool()
    break;
    case 'create':
        init()
    break;
    case '-c':
        compileSass(args)
    break;
    case '-webp':
        msg.info(`Iniciando conversión...`)
        if(subcommand !== 'all'){
            convertToWebp(args)
        }else{
            convertAllToWebp(args)
        }
    break;
    default:
        clearConsole()
        msg.error(`Error: Comando no encontrado - Revisa el comando ingresado, si deseas ver los comandos disponibles puedes ejecutar nova -h o nova -help`);
    break;
}
