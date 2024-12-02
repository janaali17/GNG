const express = require('express'); //assigning require express to express
const app = express()
const port = 1784 //assigning the port num to 1784
app.use(express.json()) //change to readable form
const sqlite3 = require('sqlite3') //imported sqlite(database) 
const data = new sqlite3.Database('inputs.data')


app.get('/', (req, res) => { res.send("welcome to GNG") }) 


const createusertable= `CREATE TABLE IF NOT EXISTS user(
    ID integer primary key autoincrement, 
    fullname text not null,
    email text not null,
    number text not null,
    address text,
    username text not null,
    password text not null
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

const createskinscaretable= `CREATE TABLE IF NOT EXISTS skincare(
    ID integer primary key autoincrement, 
    prouducttype text not null,
    age text not null,
    skintype text not null,
    price integer not null,
    brandname text
)`
app.post('/skincarequery', (req, res) => { // route
    let prouducttype = req.body.prouducttype 
    let age = req.body.age
    let skintype = req.body.skintype
    let price = req.body.price
    let brandname = req.body.brandname
    data.run(`insert into skincare(prouducttype,age,skintype,price,barndname) values('${prouducttype}','${age}','${skintype}','${price}','${brandname}')`,(err) => {
        if (err) {
            console.log(err.message)
            return res.send(err)
        } 
        else 
        return res.send("your product has been added")
    })
}) 



const createappointmentable= `CREATE TABLE IF NOT EXISTS appoinment(
    ID integer primary key autoincrement, 
    name text not null,
    diagnosis text not null,
    doctor_name text not null,
    time intger not null
)`
 app.post('/booking/appointment', (req, res) => { // route
     let name = req.body.name 
     let diagnosis = req.body.diagnosis
     let doctor_name = req.body.doctor_name
    let time = req.body.time
    
    data.run(`insert into skincare(name,diagnosis,doctor_name,time) values('${name}','${diagnosis}','${doctor_name}','${time}')`,(err) => {
         if (err) {
             console.log(err.message)
            return res.send(err)
        } 
        else 
        return res.send("your apoointment has been created")
        })
    })

const createfindstoretable= `CREATE TABLE IF NOT EXISTS findstore(
    ID integer primary key autoincrement, 
    product_id integer not null,
    location text not null
)` 
app.post('/find/store', (req, res) => { // route
    let product_id = req.body.product_id 
    let location = req.body.location
   
   data.run(`insert into findstore (product_id,location) values('${product_id}','${location}')`,(err) => {
        if (err) {
            console.log(err.message)
           return res.send(err)
       } 
       else 
       return res.send("your store table has been created")
       })
   })

const createfeedbacktable= `CREATE TABLE IF NOT EXISTS feedback(
    ID integer primary key autoincrement, 
    





app.listen(port,()=>{
    console.log(`Server is running at port: ${port}`)
    data.serialize( () => {
        data.exec(createusertable,(err) =>{
    
            if (err) {
                console.error('error creating user table', err) 
            } else {
                console.log("the user table was created successfully")
            }
        }) 
        data.exec(createskinscaretable,(err) =>{
    
            if (err) {
                console.error('error creating skincare table', err) 
            } else {
                console.log("the skincare table was created successfully")
            }
        })
        data.exec(createfindstoretable,(err) =>{
    
            if (err) {
            console.error('error creating find store table', err) 
            } else {
            console.log("the store table was created successfully")
            }
} )
})
})