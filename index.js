const express = require('express'); //assigning require express to express
const app = express()
const port = 1784 //assigning the port num to 1784
app.use(express.json) //change to readable form
const sqlite3 = require('sqlite3') //imported sqlite(database) 
const data = new sqlite3.Database('inputs.data')


app.get('/', (req, res) => { res.send("hello jana") }) 
app.listen(port,()=>{
    console.log(`Server is running at port: ${port}`)
})

