module.exports = (app, jwt, knex, SECRET_KEY) =>{
    // login routes
    app.post("/login", (request, response) =>{
        if (request.body.email === "" || request.body.password === ""){
            console.log({"msg": "email and password both are require!"})
        }else{
            knex.select('*').from('users')
            .where('email', request.body.email)
            .then((data) =>{
                console.log(data);
                if (data.length>0){
                    if (data[0].password === request.body.password){
                        const token = jwt.sign({"id": data[0].id, "name": data[0].name, "email": data[0].email, "password": data[0].password, "role":data[0].role }, SECRET_KEY);
                        // console.log({"Login Success": token});
                        response.cookie("key", token);
                        console.log({"logged in": data, token});
                        response.send({"You are logged in!": data});
                    }else{
                        response.send({
                            "Error": "invalid password"
                        })
                    }
                }else{
                    response.send({
                        "Error": "The user doesn't exists!"
                    })
                }
            }).catch((err) =>{
                console.log(err);
            })
        }
    })
}