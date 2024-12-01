const express =require('express'); //assigning require express to express
const app= express()
const port= 7777 //assigning the port num to 7777
app.use(express.json) //change to readable form
const sqlite3= require('sqlite3') //imported sqlite(database) 
const db = new sqlite3.Database('inputs.db')  
