const mongoose = require("mongoose");
function connectDB(url) {
    return mongoose.connect(url).then(data => { console.log("Connected Database...") }).catch(error => { console.log(`Error: ${error}`) })
}
module.exports = connectDB;