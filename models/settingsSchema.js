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
        muteChannel: String,
        kickChannel: String,
        banChannel: String,
        msgdelChannel: String,
        userUpdateChannel: String,
        reportsChannel: String
    },
    expMultiplier: Number,
    muteRole: String,
    defaultEmbedColor: String,
    prefixes: [],
    blacklist: []
}, {
    collection: 'OOSettings'
});

module.exports = model('Settings Schema', settingsSchema);