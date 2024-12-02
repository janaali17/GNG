const express = require('express'); //assigning require express to express
const app = express()
const port = 1784 //assigning the port num to 1784
app.use(express.json()) //change to readable form
const sqlite3 = require('sqlite3') //imported sqlite(database) 
const db = new sqlite3.Database('inputs.db')


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
    db.run(`insert into user(fullname,email,number,address,username,password) values('${fullname}','${email}','${number}','${address}','${username}','${password}')`,(err) => {
        if (err) {
            console.log(err.message)
            return res.send(err)
        } 
        else 
        return res.send("Welcome to Glow N Grace")
    })
}) 
app.put('/user/edit/:ID/:password', (req, res) => { 
    db.run(`update user set password = '${req.params.password}' where ID = ${req.params.ID}`, (err) => {
        if (err) {
            console.log(err.message)
            return res.send(err)
        } 
        else 
        return res.send("password has been changed")
    })
}) 
app.get ('/user/getdata', (req, res) => { 
    const query= `select * from user`
    db.all( query, (err,rows) => {
        if (err) {
            console.log(err.message)
            return res.send(err)
        } 
        else 
        return res.json(rows)
    })
}) 
app.delete ('/user/delete/:ID', (req, res) => { 
    const query= `delete from user where ID = ${req.params.ID}`
    db.run( query, (err) => {
        if (err) {
            console.log(err.message)
            return res.send(err)
        } 
        else 
        return res.send("user deleted")
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
    db.run(`insert into skincare(prouducttype,age,skintype,price,barndname) values('${prouducttype}','${age}','${skintype}',${price},'${brandname}')`,(err) => {
        if (err) {
            console.log(err.message)
            return res.send(err)
        } 
        else 
        return res.send("your product has been added")
    })
}) 
app.get ('/skincare/getdata', (req, res) => { 
    const query= `select * from skincare`
    if (prouducttype){
        query+=`where prouducttype= '${prouducttype}`
    }
    db.all( query, (err,rows) => {
        if (err) {
            console.log(err.message)
            return res.send(err)
        } 
        else 
        return res.json(rows)
    })
})
app.delete ('/skincare/delete/:ID', (req, res) => { 
    const query= `delete from skincare where ID = ${req.params.ID}`
    db.run( query, (err) => {
        if (err) {
            console.log(err.message)
            return res.send(err)
        } 
        else 
        return res.send("product deleted")
    })
}) 




const createappointmenttable= `CREATE TABLE IF NOT EXISTS appointment(
    ID integer primary key autoincrement, 
    name text not null,
    diagnosis text not null,
    doctor_name text not null,
    time text not null
)`
 app.post('/booking/appointment', (req, res) => { // route
     let name = req.body.name 
     let diagnosis = req.body.diagnosis
     let doctor_name = req.body.doctor_name
     let time = req.body.time
    
    db.run(`insert into appointment(name,diagnosis,doctor_name,time) values('${name}','${diagnosis}','${doctor_name}','${time}')`,(err) => {
         if (err) {
            console.log(err.message)
            return res.send(err)
        } 
        else {
        return res.send("your apoointment has been created")}
        })
})
app.put('/appointment/edit/:ID/:time', (req, res) => { 
    db.run(`update user set time = '${req.params.password}' where ID = ${req.params.ID}`, (err) => {
        if (err) {
            console.log(err.message)
            return res.send(err)
        } 
        else 
        return res.send("appointment has been changed")
    })
}) 
app.get ('/appointment/getdata', (req, res) => { 
    const diagnosis = req.query.diagnosis;
    let query= `select * from appointment`
    if (diagnosis){
        query+=`where diagnosis= '${diagnosis}'`
    }
    db.all( query, (err,rows) => {
        if (err) {
            console.log(err.message)
            return res.send(err)
        } 
        else 
        return res.json(rows)
    })
})
app.delete ('/appointment/delete/:ID', (req, res) => { 
    const query= `delete from appointment where ID = ${req.params.ID}`
    db.run( query, (err) => {
        if (err) {
            console.log(err.message)
            return res.send(err)
        } 
        else 
        return res.send("appointment deleted")
    })
}) 
    




const createfindstoretable= `CREATE TABLE IF NOT EXISTS findstore(
    ID integer primary key autoincrement, 
    product_id integer not null,
    location text not null,
    FOREIGN KEY (product_id) REFERENCES product(ID)
)` 
app.post('/find/store', (req, res) => { // route
    let product_id = req.body.product_id 
    let location = req.body.location
   
   db.run(`insert into findstore (product_id,location) values(${product_id},'${location}')`,(err) => {
        if (err) {
            console.log(err.message)
           return res.send(err)
       } 
       else 
       return res.send("your store table has been created")
       })
})
app.get ('/findstore/getdata', (req, res) => { 
    const query= `select * from findstore`
    if (location){
        query+=`where location= '${location}`
    }
    db.all( query, (err,rows) => {
        if (err) {
            console.log(err.message)
            return res.send(err)
        } 
        else 
        return res.json(rows)
    })
})
app.delete ('/findstore/delete/:ID', (req, res) => { 
    const query= `delete from findstore where ID = ${req.params.ID}`
    db.run( query, (err) => {
        if (err) {
            console.log(err.message)
            return res.send(err)
        } 
        else 
        return res.send("store deleted")
    })
}) 





const createfeedbacktable= `CREATE TABLE IF NOT EXISTS feedback(
    ID integer primary key autoincrement, 
    feedbackid integer, 
    username text not null,
    rating integer,
    feedback_message text
 )`
 app.post('/feedback', (req, res) => { // route
    let feedbackid = req.body.feedbackid 
    let username = req.body.username
    let rating = req.body.rating
    let feedback_message = req.body.feedback_message
   
   db.run(`insert into feedback(feedbackid,username,rating,feedback_message) values(${feedbackid},'${username}',${rating},${feedback_message})`,(err) => {
        if (err) {
            console.log(err.message)
           return res.send(err)
       } 
       else 
       return res.send("your feedback has been created")
       })
})
app.get ('/feedback/getdata', (req, res) => { 
    const query= `select * from feedback`
    if (username){
        query+=`where username= '${username}`
    }
    db.all( query, (err,rows) => {
        if (err) {
            console.log(err.message)
            return res.send(err)
        } 
        else 
        return res.json(rows)
    })
})
app.delete ('/feedback/delete/:ID', (req, res) => { 
    const query= `delete from feedback where ID = ${req.params.ID}`
    db.run( query, (err) => {
        if (err) {
            console.log(err.message)
            return res.send(err)
        } 
        else 
        return res.send("feedback deleted")
    })
}) 









app.listen(port,()=>{
    console.log(`Server is running at port: ${port}`)
    db.serialize( () => {
        db.exec(createusertable,(err) =>{
    
            if (err) {
                console.error('error creating user table', err) 
            } else {
                console.log("the user table was created successfully")
            }
        }) 
        db.exec(createskinscaretable,(err) =>{
    
            if (err) {
                console.error('error creating skincare table', err) 
            } else {
                console.log("the skincare table was created successfully")
            }
        })
        db.exec(createappointmenttable,(err) =>{
    
            if (err) {
                console.error('error creating appointment table', err) 
            } else {
                console.log("the appointment table was created successfully")
            }
        })
        db.exec(createfindstoretable,(err) =>{
    
            if (err) {
            console.error('error creating find store table', err) 
            } else {
            console.log("the store table was created successfully")
            }
        })
        db.exec(createfeedbacktable,(err) =>{
    
            if (err) {
            console.error('error creating feedback table', err) 
            } else {
            console.log("the feedback table was created successfully")
            }
        })
})
})