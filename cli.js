#!/usr/bin/env node

import chalk from 'chalk'

import clearConsole from './utils/clearConsole.js'

import unicodeSymbols from './utils/unicodeSymbols.js'

const log = console.log

// Grab provided args.
const [,,...args] = process.argv
// console.log(args[0])
// Print hello world provided args
// log(chalk.blue.bgWhite.dim(`Hello World ${args}`))

console.log(unicodeSymbols)

if(args[0] === '-list'){
    clearConsole()
    log(chalk.greenBright.dim(`${unicodeSymbols.info} Lista`))   
}else if(args[0] === 'create'){
    clearConsole()
}

