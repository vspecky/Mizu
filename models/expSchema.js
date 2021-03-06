const { Schema, model } = require('mongoose');

const expSchema = Schema({
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

module.exports = model('EXP_USERS', expSchema);