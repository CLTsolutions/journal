/* Headers are sent by the client along with the request. They contain special instructions for the server. */
module.exports = (req, res, next) => { //'req' refers to the request from the client, specifically focusing on any headers present on the request object. 'res' refers to the response and will be used to present which types of headers are allowed by the server.
    //call res.header so the server will respond with what kind of headers are allowed in the request.
    res.header('access-control-allow-origin', '*'); // tells the server the specific origin locations that are allowed to communicate with the server.
    //* is a wildcard and means everything is allowed (requests originating from any location are allowed to communicate with the db)
    res.header('access-control-allow-methods', 'GET, POST, PUT, DELETE'); //http methods the server will allow being used
    //Postman allows 15, but our server will only accept these 4.
    res.header('access-control-allow-headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization'); //specific header types that the server will accept from the client

    next(); //send request along to next destination (i.e, API endpoint or another middleware function)
    /*
    next() tells the middleware to continue its process. With the above example, next() takes the request object and passes it on the endpoint on the server. Not including the next() would cause the application to break, as the server doesn't know what to do after sending the header. We could also use next() to provide additional headers if we want further restrictions on our server.
    */
};