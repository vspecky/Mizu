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
        warnChannel: String,
        msgdelChannel: String,
        userupdateChannel: String,
        reportsChannel: String,
        suggestChannel: String,
        oofchestChannel: String
    },
    warnPunishments: {},
    expMultiplier: Number,
    muteRole: String,
    eventsRole: String,
    defaultEmbedColor: Number,
    prefixes: [],
    blacklist: []
}, {
    collection: 'OOSettings'
});

module.exports = model('Settings Schema', settingsSchema);