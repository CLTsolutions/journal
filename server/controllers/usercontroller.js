// **********template when creating controller
const router = require('express').Router(); //importing Express framework and accessiong the Router() method
const User = require('../db').import('../models/user'); //bring in db to interact with model
//It is convention to use Pascal casing (uppercase on both words) for a model class with Sequelize.
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); //bcrypt package is in package.json

module.exports = router; //export model for usage outside of the file

/*
What we are doing below?
1) Create a new endpoint: /create (utilizing router)
2) The endpoint is going to be a post request
3) Have an object that matches the model of UserTable (email/password).
4) Let sequelize create a new record in the database (create)
*/

/*  ********** USER SIGNUP ********** */
router.post('/create', (req, res) => {

    User.create({ //create is sequelize shortcut method
        email: req.body.user.email, //written like this makes it dynamic
        password: bcrypt.hashSync(req.body.user.password, 13)
        //bcrypt has a function called hashSync() which accepts 2 arguments (string, string or number)
        //string is value we want hashed
        //number of times we want first argument salted (13x in this example)
    })
    .then((user) => { //function can be anonymous and doesn't need to be named (best practice for parameter is to use whatever table working with -- ie user)
        
        let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24}); //jwt is dependency inside package.json
        //.sign is method used to create token
        //token: payload (data to be sent via token) is user.id, signature (used by algorithm, and if missing renders token useless) is "i_am_secret", specific options (when it expires)

        res.json({ //sending response back to client as json
            user: user,
            message: "User successfully created!",
            sessionToken: token //passed value of token to assign to specific user
        });
    })
    .catch(err => res.status(500).json({ error: err }))
});

/* ********** USER LOGIN ********** */
//using post because when we log in we are still sending data to db
//post() accepts 2 arguments: '/login' (the path) and the callback function allowing us access to the request and/or response
router.post('/login', (req, res) => {

    User.findOne({ //'findOne' is sequelize method that searches db (data retrieval).
        where: { //sequelize object that tells db to look for something matching these properties
            email: req.body.user.email
        }
    })
    .then((user) => {
        if (user) { //using if to check if response has a boolean value
            //use bcrypt to decrypt the hash value and COMPARE it to the supplied pw
            //3 parameters: 1) pull pw value from current request when user is signing up, 2) pulls hashed pw from db,
                //3) runs callback function producing a result on either success or failure.
            bcrypt.compare(req.body.user.password, user.password, (err, matches) => {
                if (matches) {
                    
                    let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24});

                    res.status(200).json({ //sending back to Postman as a JSON response
                        user: user, //if user matches, send back user info
                        message: "User logged in successfully!",
                        sessionToken: token //passed value of token to assign to specific user
                    })
                    
                } else {
                    res.status(502).send({ error: "Login Failed" });
                }
            });
        } else { //catches untrue values (null isn't an error, but it's falsey and can be caught with 'else' statement)
            res.status(500).json({ error: 'User does not exist.' })
        }
    })
    .catch(err => res.status(500).json({ error: err }));
});

module.exports = router;