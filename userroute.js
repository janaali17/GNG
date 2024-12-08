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