const { Schema, model } = require('mongoose');

const nicknameSchema = new Schema({
    UUID: String,
    nicknames: []
}, {
    collection: 'Nicknames'
});

module.exports = model('Nickname Schema', nicknameSchema);