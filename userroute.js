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
