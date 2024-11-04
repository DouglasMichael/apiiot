import { openDb } from "./configDB.js"
export async function createTable(){
    openDb().then(db=>{
        db.exec('CREATE TABLE IF NOT EXISTS sensor ( id INTEGER PRIMARY KEY, tipo TEXT, dados TEXT, data NUMERIC )')
    })
}