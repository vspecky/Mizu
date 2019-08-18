const mongoose = require('mongoose');

const marriageschema = mongoose.Schema({
    'GUILD ID': Number,
    MEMBER1: Number,
    MEMBER2: Number,
    'ROLE ID': Number
}, {
    collection: 'MARRIAGE'
});

module.exports = mongoose.model('MARRIAGE', marriageschema);