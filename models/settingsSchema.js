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
    modMailSettings: {
        modMailChannel: String,
        detailLimit: Number,
        undetailedCooldown: Number,
        modMailCooldown: Number
    },
    expSettings: {
        comboIncrement: Number,
        comboInterval: Number,
        maxCombo: Number,
        lowestExp: Number,
        highestExp: Number,
        expMultiplier: Number,
        expCooldown: Number
    },
    commandSettings: {
        modBlockedChannels: {},
        commandCooldown: Number,
        roleRestrictedCommands: {}
    },
    welcomeSettings: {
        welcomeChannel: String,
        welcomeMsg: String
    },
    warnPunishments: {},
    expMultiplier: Number,
    modMailChannel: String,
    muteRole: String,
    eventsRole: String,
    defaultEmbedColor: Number,
    prefixes: [],
    blacklist: []
}, {
    collection: 'OOSettings'
});

module.exports = model('Settings Schema', settingsSchema);