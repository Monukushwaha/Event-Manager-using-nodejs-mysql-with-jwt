module.exports = (app,knex,jwt,SECRET_KEY) => {

    app.get("/allusers",(req,res) => {
        
        var cookie= req.headers.cookie.slice(4)
    
        jwt.verify(cookie, SECRET_KEY, (err, decode) => {
            if (!err) {
                let user_role=decode.role;
                if (user_role=== 'admin'){
                    knex('users').select('*')
                        .then(users => {
                         res.send({
                            "users": users
                        })
                    })
            } else {
                res.send("you are not admin!!")
            }
            }else{
            res.send(err.message)
        }
        })
    });
    // routes for getting all events and  corresponding events
    app.get("/eventsAnduser",(req,res) =>{
        var cookie = req.headers.cookie.slice(4)
        jwt.verify(cookie,SECRET_KEY,(err,decode) =>{
            if (decode.role==="admin"){
                knex('users')
                .join('events',{'users.id':decode.id}, {'events.user_id':decode.user_id})
                .select('users.id','users.name','users.email','events.user_id','events.event_name','events.description','events.city','events.start_date','events.end_date').then((data)=> {
                    res.send(data)
                })
                .catch((err) =>{
                    res.send(err)
                })
            }else(
                res.send(err)
            )
            })
    })
    
}