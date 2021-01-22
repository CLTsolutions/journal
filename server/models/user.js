//models = how db tables are going to be structured
/*
Columns to think about?
-email store string null = false
-password store string null = false
*/

//function below returns user table (DataTypes ie strings, booleans, integers, etc)
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', { //the name of the table is 'User'
    // Model attributes are defined here (these are the columns in our table)
        email: { //column name
            type: DataTypes.STRING, //what type of column is this (see above)?
            allowNull: false, //unable to send null data through
            unique: true //all data (emails for example) must be unique and cannot be duplicated
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
    return User;
}