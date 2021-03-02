const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    why: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    }
});



module.exports = mongoose.model('Song', songSchema);