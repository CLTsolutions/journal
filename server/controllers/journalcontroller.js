/* ********** COOKIE CUTTER OUTLINE FOR EVERY CONTROLLER BELOW **********
let express = require('express');
let router = express.Router();

router.get('/practice', function(req, res) {
    res.send('Hey!! This is a practice route! Weeeee')
})

module.exports = router
*/

let express = require('express'); //imports Express framework and stores it inside express variable (gateway to using Express methods)
let router = express.Router(); //using this to access express properties and methods (using express variable to access Router() method)
//Router method returns a router object
let validateSession = require('../middleware/validate-session');
const Journal = require('../db').import('../models/journal');

//using get method from http protocol
//very similar to app.use (first thing it takes is endpoint)
//'journal' is in app.js
router.get('/practice', validateSession, (req, res) => {
    res.send('Hey!! This is a practice route! Weeeee')
});

router.get('/about', (req, res) => {
    res.send('This is the about route.')
});

/***************************
    * JOURNAL CREATE *
****************************/
router.post('/create', validateSession, (req, res) => { //use router object to access .post() method
    //establish path for method with './create' subroute
    const journalEntry = { //not a literal variable. Can be changed dynamically based on user input (like in signup within usercontroller.js)
        //below values come from journal object in the body from the request
        title: req.body.journal.title,
        date: req.body.journal.date,
        entry: req.body.journal.entry,
        owner: req.user.id //this comes from validateSession.js so we can use dotnotation to step into and grab user's id to -
        //assign to specific journal entry
    }
    Journal.create(journalEntry) //.create() is sequelize method that allows us to create an instance of the journal model -
    //and send the journalEntry object to the db (as long as data types match the model)
    .then(journal => res.status(200).json(journal))
    .catch(err => res.status(500).json({ error: err }))
})

/***************************
    * GET ALL ENTRIES *
****************************/
router.get('/', (req, res) => { //get request with subroute of '/'
    Journal.findAll() //callback function is looking at the journal table in our db and calling upon .findAll(), -
    //a sequelize method to find all of the items.
    .then(journals => res.status(200).json(journals))
    .catch(err => res.status(500).json({ error: err}))
});

/*******************************
    * GET ENTRIES BY USER *
********************************/
router.get('/mine', validateSession, (req, res) => { //get request with subroute of 'mine' and restricting route -
//for specific users by calling upon the validateSession middleware function
    let userid = req.user.id //digging into user object within the request object to grab the user's id.
    Journal.findAll({ //looking at journal table again (see above router.get function)
        where: { owner: userid } //Sequelize's where attribute specifies specific items from the db. In this case, -
        // we want to look at the id in the owner column in the db and find the journal entries that correlate with that specific user id we extrapolated from the validateSession middleware function.
    })
    .then(journals => res.status(200).json(journals))
    .catch(err => res.status(500).json({ error: err}))
});

/*******************************
    * GET ENTRIES BY TITLE *
********************************/
router.get('/:title', (req, res) => { //different from other routes because it's dynamic
    let title = req.params.title; //In the request object, there is an object called params. From here, we can -
    // access the value(s) we pass into the url's parameter. In this case, it's looking specifically at the segment -
    // of the url with the keyword of 'title.'

    Journal.findAll({ 
        where: { title: title } //we want to look at the journal's title in the title column in the db and find the journal entries that correlate with that specific title we extrapolated from the url's parameters.
    })
    .then(journals => res.status(200).json(journals))
    .catch(err => res.status(500).json({ error: err}))
});

/*******************************
    * UPDATE JOURNAL ENTRY *
********************************/
router.put('/update/:entryId', validateSession, (req, res) => { //'put' replaces whatever is already there with whatever we -
//give it (means update)
//to be easier for user, '/update' is used and 'entryId' is to be passed through the URL again
    const updateJournalEntry = {
        title: req.body.journal.title,
        date: req.body.journal.date,
        entry: req.body.journal.entry,
    };

    const query = { where: { id: req.params.entryId, owner: req.user.id } };

    Journal.update(updateJournalEntry, query)
        .then((journals) => res.status(200).json(journals))
        .catch((err) => res.status(500).json({ error: err }));
});

/*******************************
    * DELETE JOURNAL ENTRY *
********************************/
router.delete('/delete/:id', validateSession, (req, res) => {
    const query = {where: {id: req.params.id, owner: req.user.id } }; //userid is set when validateSession is called
    //req.params points to the URL.

    Journal.destroy(query) //.destroy() is a Sequelize method to remove an item from a database
    //'query' tells tells Sequelize what to look for when trying to find an item to delete
        .then(() => res.status(200).json( { message: "Journal Entry Removed" }))
        .catch((err) => res.status(500).json({ error: err }));
})

//exports router
module.exports = router;