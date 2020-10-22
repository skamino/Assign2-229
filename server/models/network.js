let mongoose = require('mongoose');

// create a model class
let networkModel = mongoose.Schema({
    name: String,
    number: String,
    email: String,
},
{
    collection: "network"
});

module.exports = mongoose.model('Network', networkModel);