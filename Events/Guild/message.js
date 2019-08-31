const { RichEmbed } = require('discord.js');
const botprefix = require("../../JSON/prefixc.json");
const { connect } = require('mongoose');
const expschema = require('../../models/expSchema.js');
let settingsObject = require('../../Handlers/settings.js').settings;
let settings = {};
let cooldown = new Set();
let sameSpamSet = new Map();
let genSpamSet = new Map();

module.exports = async (bot, message) => {

    if (message.author.bot) return;
    if (message.channel.type === "dm") return;

    if(profanityFilter(message.content)) return message.delete();

    await antiSpamCheck(message);

    testing = message.content;

    let prefix = botprefix.prefix;

    if(message.content.startsWith(prefix)) {
        let messageArray = message.content.split(/ +/g);
        let cmd = messageArray[0].slice(prefix.length).toLowerCase();
        let args = messageArray.slice(1);
        let commandFile = bot.commands.get(cmd) || bot.commands.get(bot.aliases.get(cmd));

        if (commandFile) {
            commandFile.run(bot, message, args);
        }
    } else {
        if (!cooldown.has(message.author.id)) addExperienceToUser(message);
    }

}


const addExperienceToUser = message => {

    connect('mongodb://localhost/RATHMABOT', {
        useNewUrlParser: true
    });

    expschema.findOne({ UUID: message.author.id }, (err, exp) => {
        if (err) console.log(err);

        let xpAdd = Math.ceil(Math.random() * 10) + 15;
        let xpmult = settings.expmultiplier || 1;

        if (!exp) {
            const newexp = new expschema({
                UUID: message.author.id,
                'LAST KNOWN USERNAME': message.author.username,
                '277888888838815744': {
                    EXPERIENCE: xpAdd,
                    'WEEKLY EXPERIENCE': xpAdd,
                    COMBO: 0.04
                }
            });

            newexp.save().catch(err => console.log(err));
        } else {
            if (Date.now() - exp['277888888838815744']['LAST MESSAGE'] <= 120000) {
                if (exp['277888888838815744'].COMBO < 0.20) exp['277888888838815744'].COMBO += 0.04;
                exp['277888888838815744']['LAST MESSAGE'] = Date.now();
            } else {
                exp['277888888838815744'].COMBO = 0;
                exp['277888888838815744']['LAST MESSAGE'] = Date.now();
            }

            xpAdd += Math.ceil(xpAdd * exp['277888888838815744'].COMBO);
            xpAdd = Math.ceil(xpAdd * xpmult);
            exp['277888888838815744'].EXPERIENCE += xpAdd;
            exp['277888888838815744']['WEEKLY EXPERIENCE'] += xpAdd;
            console.log(`xpmult is ${xpmult} and exp is ${xpAdd}`);

            exp.save().catch(err => console.log(err));
        }

    });

    cooldown.add(message.author.id);

    setTimeout(() => {
        cooldown.delete(message.author.id);
    }, 60000);
}


const antiSpamCheck = message => {

    let muteRole = message.guild.roles.find(r => r.name == 'muted');

    if(!sameSpamSet.has(message.author.id)) {
        sameSpamSet.set(message.author.id, [message.content]);
        setTimeout(() => {
            sameSpamSet.delete(message.author.id)
        }, 10000);

    } else {
        msg = sameSpamSet.get(message.author.id);
        msg.push(message.content);
        while(msg.length > 5) msg.shift();
        sameSpamSet.set(message.author.id, msg);

        if(msg.every(content => content == msg[0])) {
            message.member.addRole(muteRole.id);
            setTimeout(() => {
                message.member.removeRole(muteRole.id);
            }, 300000);
        }
        
    }

    let antiSpamMsgAmt = settings.aspammsgs || 5;
    let antiSpamTime = settings.aspamtime || 5;

    if(!genSpamSet.has(message.author.id)) {
        genSpamSet.set(message.author.id, 1);
        setTimeout(() => {
            genSpamSet.delete(message.author.id);
        }, antiSpamTime * 1000);

    } else {
        msgAmt = genSpamSet.get(message.author.id);
        genSpamSet.set(message.author.id, (msgAmt + 1));

        if(msgAmt >= antiSpamMsgAmt) {
            message.member.addRole(muteRole.id);
            setTimeout(() => {
                message.member.removeRole(muteRole.id);
            }, 300000);
        }
    }

}


const profanityFilter = content => {

    const blacklist = ['nigger', 'testprofane'];
    const deserialized = content.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    const contentArray = deserialized.split(/ +/g);
    return contentArray.some(word => blacklist.includes(word));

}

setInterval(() => {
    settings = settingsObject();
}, 10000);