module.exports = (sequelize, DataTypes) => {
    const Journal = sequelize.define('journal', { //the name of the table is 'journal'
    // Model attributes are defined here (these are the columns in our table)
        title: { //column name
            type: DataTypes.STRING, //what type of column is this (see above)?
            allowNull: false, //unable to send null data through
        },
        date: {
            type: DataTypes.STRING,
            allowNull: false
        },
        entry: {
            type: DataTypes.STRING,
            allowNull: false
        },
        owner: {
            type: DataTypes.INTEGER
        }
    })
    return Journal;
};