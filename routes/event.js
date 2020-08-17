const { decode } = require("jsonwebtoken");

module.exports = (app, knex, jwt, SECRET_KEY) => {
// new events creating routes 
    app.post("/create_new_event",(req,res)=> {
        var cookie= req.headers.cookie.slice(4)
        jwt.verify(cookie, SECRET_KEY, (err, decode) => {
            if(!err){
                const {event_name,city,description,start_date,end_date}=req.body;
                if (event_name==="" || city==="" || description ==="" || start_date ==="" || end_date==="") {
                    res.send("all fields data required!!")
    
                } else {
                    knex('events').insert({
                        "user_id": decode.id,
                        "event_name": req.body.event_name,
                        "description": req.body.description,
                        "start_date": req.body.start_date,
                        "end_date": req.body.end_date,
                        "city": req.body.city
                    }).then((data) => {

                        res.send('event created successfully !!')
                    }).catch((err) => {
                        res.send(err)
                    })
    
                }
            }else{
                res.send(err.message)
            }
        })

    })


// routes for updating event using events id 

    app.put("/update_event/:event_id", (req, res) => {
        var cookie = req.headers.cookie.slice(4)
        jwt.verify(cookie, SECRET_KEY, (err, decode) => {
            if(!err){
                knex('events').where({ 'id': req.params.event_id, "user_id": decode.id }).update(req.body)
                    .then((data) => {
                        res.send("event updated sucessfully!")
                        } 
                    )
                    .catch((err) => {
                        res.send(err)
                    })
                }else{
                    res.send(err.message)
                }
        })
    })


    // routes for deleting events

    app.delete("/delete_event/:event_id", (req, res) => {
        var cookie = req.headers.cookie.slice(4)
        jwt.verify(cookie, SECRET_KEY, (err, decode) => {
            knex('events')
                .where({ 'id': req.params.event_id, "user_id": decode.id }).del()
                .then((data) => {
                    res.send("evnt deleted suceessfully")
                })
                .catch((err) => {
                    res.send(err)
                })
        })
    })


    // routes for getting all events by single user 
    app.get("/events_by_user",(req,res) =>{
        var cookie = req.headers.cookie.slice(4)
        jwt.verify(cookie,SECRET_KEY,(err,decode) =>{
            knex.select().table('events').where({'user_id':decode.id }).then((data)=> {
                res.send(data)
            })
            .catch((err) =>{
                res.send(err)
            })
            
        })
    })

};