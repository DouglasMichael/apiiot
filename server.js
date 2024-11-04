import { openDb } from "./configDB.js"
import { createTable } from "./createTable.js"
import express from "express"
const app = express()


openDb()
createTable()


app.use(express.json(),(req, res, next)=> {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // Isso permite qualquer origem (não seguro em produção).
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();  
})

app.get('/api/v1/sensor', (req,res) => {
    openDb().then(db=>{
        db.all('SELECT * FROM sensor')
        .then(sensor=>  res.json(sensor))
    });
})

app.post('/api/v1/sensor', (req,res) => {
    const date = new Date()
    let sensor = req.body;
    openDb().then(db=>{
        db.run('INSERT INTO sensor (id, tipo, dados, data) VALUES (NULL,?,?,?)', [sensor.tipo, sensor.dados, date.toLocaleString()]);
    });
    res.json({
        "statusCode": 200
    })
})

app.listen(3000)