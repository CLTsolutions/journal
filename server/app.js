/*

main hub (center of wheel with spokes coming from it) -- identified as hub inside package.json file (main: "app.js")

How to run server?
1) node app.js
2) package.json - "start" npm start
3) nodemon (npm install -g nodemon)

*/

require('dotenv').config();
let express = require("express"); //importing express engine with require statement
//express is inside node modules - npm package installed with dependencies inside package.json
let app = express(); //top level function exported by Express module (allows us to create Express app)
let sequelize = require('./db');
let journal = require('./controllers/journalcontroller'); //import route object and store it in journal variable
let user = require('./controllers/usercontroller');

//.sync is a method that ensures all the modules created inside server are put on db if they aren't already there.
sequelize.sync();
//sequelize.sync({force: true})

app.use(require('./middleware/headers')); //activated headers and MUST come before the routes are declared.

app.use(express.json()); //"hey, be prepared to handle JSON objects"
//goes underneath sequelize.sync

/* ********** ENDPOINTS **********
*When adding anything to app.js file, it's sandwich between imports (above) and app.listen (below). -- PLACEMENT IS KEY
*Routing:
    - app.use(endpoint, callback function)
    - callback function runs after endpoint is hit
        * ALWAYS 2 parameters (request & response)
    - res.send is function sent back to user
*/
//response when someone hits endpoint -- 'test' is the endpoint
//callback function is function(req, res)
//res.send is similar to console.log
//---------- use below for references on end points
// app.use('/test', function(req, res) {
//     res.send('This is a message from the test endpoint on the server!')
// });

// app.use('/chelsey', function(req, res) {
//     res.send('My name is Chelsey, and I am 34 years old!')
// });

//Have endpoint of journal/practice ('practice' is in journal controller)
//Send a response from that endpoint (This is a practice route).
//app.use first parameter creates base url
//app.use second parameter (journal) means all routes created in the journalcontroller.js file will be sub-routes (http://localhost:3000/journal)
//"hey, is there an app.journal? yes, now what? go into journal controller and find the get.route for 'practice.'"
    //http://localhost:3000/journal/practice or http://localhost:3000/journal/about

/********************** 
   * EXPOSED ROUTE *
 **********************/
app.use('/user', user);

/********************** 
   * PROTECTED ROUTE *
 **********************/
/*
app.use(require('./middleware/validate-session'));

- Imported the validate-session middleware, which will check to see if the incoming request has a token. Anything beneath the validate-session will require a token to access, thus becoming protected. Anything above it will not require a token, remaining unprotected. Therefore, the user routes is not protected, while the journal route is protected. 

- Best option when you have a controller or multiple controllers where ALL of the routes need to be restricted.

- Next option is the add above directly to the controller (best when you have a controller where a specific number of the routes need to be restricted)
*/
app.use('/journal', journal);


app.listen(3000, function() { //utilizing variable and creating listening port 3000 - localhost:3000
    console.log("App is listening on port 3000");
});