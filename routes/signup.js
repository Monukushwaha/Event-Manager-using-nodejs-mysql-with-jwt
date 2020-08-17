module.exports = (app, knex) => {
    // signup routes 
    app.post("/signup", (req, res) => {
        const {name,email,phone,password,role}=req.body;
        if (name==="" || email==="" || phone==="" || password==="" || role==="") {
            res.send({ "message": "All the fields data required!" })
        } else {
                    knex.select('*').from('users')
                        .where({ "name": req.body.name, "email": req.body.email, "phone": req.body.phone, "password": req.body.password, "role": req.body.role })
                        .then((data) => {
                            if (data.length < 1) {
                                knex('users').insert(req.body)
                                    .then((result) => {
                                        res.send("signup successfull!!");
                                    }).catch((err) => {
                                        res.send(err)
                                    })
                            } else {
                                console.log({ "exist": "this user alredy exists.." });
                                res.send({ "exist": "this user alredy exists.." })
                            }
                        }).catch((err) => {
                            res.send(err)
                        })
                // })
        }
    })
}