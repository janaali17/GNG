const express = require('express'); //assigning require express to express
const app = express()
const port = 1784 //assigning the port num to 1784
app.use(express.json) //change to readable form
const sqlite3 = require('sqlite3') //imported sqlite(database) 
const data = new sqlite3.Database('inputs.data')


app.get('/', (req, res) => { res.send("hello jana") }) 


const createusertable= `CREATE TABLE IF NOT EXISTS user(
    ID integer primary key autoincrementm, 
    fullname text not null,
    email text not null,
    number text not null,
    address text,
    username text noty null,
    password text not null,
)`
app.post('/user/register', (req, res) => { // route
    let fullname = req.body.fullname 
    let email = req.body.email
    let number = req.body.number
    let address = req.body.address
    let username = req.body.username
    let password = req.body.password
    data.run(`insert into user(fullname,email,number,address,username,password) values('${fullname}','${email}','${number}','${address}','${username}','${password}')`,(err) => {
        if (err) {
            console.log(err.message)
            return res.send(err)
        } 
        else 
        return res.send("Welcome to Glow N Grace")
    })
}) 

// const createskinscaretable= 
// const createnmakeuptable=
// const createfeedbacktable=
// const createappoinmentable=
// const createfindstor=




app.listen(port,()=>{
    console.log(`Server is running at port: ${port}`)
    data.serialize( () => {
        data.exec(createusertable,(err) =>{
    
            if (err) {
                console.error('error creating user table', err) 
            } else {
                console.log("successfully created")
            }
        }) 
    } )
})