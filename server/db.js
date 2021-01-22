//sequelize is dependency which translates JS into data friendly language. It converts it back to JS we can work with.
//makes life simple (instead of writing a bunch of code to access db)

const Sequelize = require('sequelize'); //require means to import it
const sequelize = new Sequelize('journal-walkthrough', 'postgres', 'password', {
  host: 'localhost',
  dialect: 'postgres'
});

sequelize
    .authenticate()
    .then(() => {
        console.log('Connected to journal-walkthrough postgres database');
    })
    .catch(err => {
        console.log('Unable to connect to the database', err);
    });

//code below is from modules
// sequelize.authenticate().then(
//     function() {
//         console.log('Connected to journal-walkthrough postgres database');
//     },
//     function(err) {
//         console.log(err);
//     }
// );

module.exports = sequelize; //exporting module since sequelize is in its own file