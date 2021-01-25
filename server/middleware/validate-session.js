/* THIS FILE CHECKS IF REQUEST HAS TOKEN ATTACHED */

const jwt = require('jsonwebtoken'); //interacting with token assigned to each session (when user signs up/logs in) so need
    //to import JWT package (like in usercontroller)
const User = require('../db').import('../models/user');

//validateSession takes 3 parameters: request, response, next
const validateSession = (req, res, next) => {
    const token = req.headers.authorization; //variable 'token' created to hold our token pulled from authorization header
        //in incoming request
    // console.log('token ==>', token);

    if(!token) { //different error handling responses below so using error code helps in debugging
        return res.status(403).send({ auth: false, message: 'No token provided' })
    } else {
        //verify method decodes token
        //3 parameters: token, .env file so token can be decrypted, callback function
        //if successful, decodeToken will contain decoded payload (data stored in token)
        //if not successful, decodeToken remains undefined. err = null by default
        jwt.verify(token, process.env.JWT_SECRET, (err, decodeToken) => {
            // console.log('decodeToken ==>', decodeToken);
            if (!err && decodeToken) { //checking if there is no err AND if decoded token has a value
                User.findOne({
                    where: {
                        id: decodeToken.id
                    }
                })
                .then(user => { //sequelize 'fineOne' method returns promise we can resolve with '.then'
                // console.log('user ==>', user);
                    if (!user) throw err;
                    // console.log('req ==>', req);
                    req.user = user; //property necessary later in adding to db
                    //callback sets 'user' value for the request as the id value passed to it before sending request to next destination
                    return next();//next() allows us to exit out of this function
                })
                .catch(err => next(err)); //if promise is rejected we can catch it with .catch and pass error into next()
            } else { //no user found
                req.errors = err; 
                return res.status(500).send('Not Authorized');
            }
        });
    }
};

module.exports = validateSession;