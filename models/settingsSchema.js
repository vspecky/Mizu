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
    antiRaidSettings: {
        smjoinsNumber: Number,
        smbuffer: Number,
        mmjoinsNumber: Number,
        mmbuffer: Number
    },
    welcomeSettings: {
        welcomeChannel: String,
        welcomeMsg: String
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
    embCols: {
        warnEmbedColor: Number,
        muteEmbedColor: Number,
        banEmbedColor: Number,
        kickEmbedColor: Number
    },
    modBlockedChannels: {},
    warnPunishments: {},
    expMultiplier: Number,
    welcomeChannel: String,
    muteRole: String,
    eventsRole: String,
    defaultEmbedColor: Number,
    prefixes: [],
    blacklist: []
}, {
    collection: 'OOSettings'
});

module.exports = model('Settings Schema', settingsSchema);