const mongoose = require('mongoose')
// connection string
mongoose.connect("mongodb+srv://SDEV255:SDEV255-Spring25@sdev255-finalproject-db.crqzkaz.mongodb.net/?retryWrites=true&w=majority&appName=SDEV255-FinalProject-DB", 
    {useNewUrlParser: true})

mongoose.connection.once("open", () => {
    console.log("Connected to DB");
});

module.exports = mongoose