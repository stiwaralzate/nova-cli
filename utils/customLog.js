import chalk from 'chalk'
import unicodeSymbols from './unicodeSymbols.js'
import welcome from '../core/welcome.js'

const log = console.log
const msg = {
    info: (text)=> log(`\n`+chalk.bold.cyan(`${unicodeSymbols.info} ${text}`)+`\n`),
    success: (text)=> log(`\n`+chalk.bold.white.dim(`${unicodeSymbols.success} ${text}`)+`\n`),
    error: (text)=> log(`\n`+chalk.bold.red(`${unicodeSymbols.error} ${text}`)+`\n`),
    table: (text) => log(text),
    welcome: () => log(chalk.green.bold(welcome)),
}

export default msg