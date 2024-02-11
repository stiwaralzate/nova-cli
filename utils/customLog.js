import chalk from 'chalk'
import unicodeSymbols from './unicodeSymbols.js'

const log = console.log
const msg = {
    info: (text)=> log(`\n`+chalk.bold.cyan(`${unicodeSymbols.info} ${text}`)+`\n`),
    success: (text)=> log(`\n`+chalk.bold.white.dim(`${unicodeSymbols.success} ${text}`)+`\n`),
    error: (text)=> log(`\n`+chalk.bold.red(`${unicodeSymbols.error} ${text}`)+`\n`),
    table: (text) => log(text),
}

export default msg