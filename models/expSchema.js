const mongoose = require('mongoose');

const expSchema = mongoose.Schema({
    UUID: Number,
    '277888888838815744': {
        EXPERIENCE: Number,
        'WEEKLY EXPERIENCE': Number,
        'DAILY VC TIME': Number,
        'LAST MESSAGE': Number,
        COMBO: Number 
    },
    'LAST KNOWN USERNAME': String
}, {
    collection: 'EXP_USERS'
});

module.exports = mongoose.model('EXP_USERS', expSchema);