const { Schema, model } = require('mongoose');

const settingsSchema = Schema({
    serverID: Number,
    antiSpamSettings: {
        genSpamMsgs: Number,
        genSpamBuffer: Number,
        antiSpamMuteTime: Number,
        sameSpamMsgs: Number,
        sameSpamBuffer: Number
    },
    logChannels: {
        muteChannel: Number,
        kickChannel: Number,
        banChannel: Number,
        msgdelChannel: Number,
        userUpdateChannel: Number
    },
    expMultiplier: Number,
    blacklist: []
}, {
    collection: 'OOSettings'
});

module.exports = model('Settings Schema', settingsSchema);