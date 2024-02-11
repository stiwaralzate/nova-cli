import Table from 'cli-table'
import msg from './customLog.js'

/**
 * 
 * @param {string[]} values
 * @param {string} heads
 * @returns {string} 
 */

const createTable = (heads, values)=>{
    const table = new Table({
        head: heads,
        colWidths: [20, 40]
    })
    
    values.forEach(val => {
        table.push(val)
    })

    msg.table(table.toString())

}


export default createTable