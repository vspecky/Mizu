const { Schema, model } = require('mongoose');

const settingsSchema = Schema({
    serverID: Number,
    antiSpamMsgs: Number,
    antiSpamTime: Number,
    expMultiplier: Number
}, {
    collection: 'OOSettings'
});

module.exports = model('Settings Schema', settingsSchema);