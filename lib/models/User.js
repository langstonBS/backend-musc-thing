const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
}, {
    toJSON: {
        virtuals: true,
        transform: (doc, ret) => {
            delete ret.id;
        }
    }
});


module.exports = mongoose.model('User', userSchema);
