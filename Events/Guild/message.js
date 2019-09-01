const { RichEmbed } = require('discord.js');
const { connect } = require('mongoose');
const expschema = require('../../models/expSchema.js');
let settingsObject = require('../../Handlers/settings.js').settings;
let settings = settingsObject();
let expcooldown = new Set();
let sameSpamSet = new Map();
let genSpamSet = new Map();
let commandcooldown = new Set();
let prefix;

module.exports = async (bot, message) => {

    if (message.author.bot) return;
    if (message.channel.type === "dm") return;

    if(antiSpamCheck(message)) return;

    if(prefixCheck(bot, message)) {
        let messageArray = message.content.split(/ +/g);
        let cmd = messageArray[0].slice(prefix.length).toLowerCase();
        let args = messageArray.slice(1);
        let commandFile = bot.commands.get(cmd) || bot.commands.get(bot.aliases.get(cmd));
        if(profanityFilter(message.content) && (commandFile !== 'blacklistadd' && commandFile !== 'blacklistdel')) return message.delete();

        if (commandFile && !commandcooldown.has(message.author.id)) {
            commandcooldown.add(message.author.id);
            setTimeout(() => {
                commandcooldown.delete(message.author.id);
            }, 5000);
            commandFile.run(bot, message, args);
        }
    } else {
        if(profanityFilter(message.content)) return message.delete();
        if (!expcooldown.has(message.author.id)) addExperienceToUser(message.author);
    }

}


const addExperienceToUser = user => {

    connect('mongodb://localhost/RATHMABOT', {
        useNewUrlParser: true
    });

    expschema.findOne({ UUID: user.id }, (err, exp) => {
        if (err) console.log(err);

        let xpAdd = Math.ceil(Math.random() * 10) + 15;
        let xpmult = settings.expMultiplier || 1;

        if (!exp) {
            const newexp = new expschema({
                UUID: user.id,
                'LAST KNOWN USERNAME': user.username,
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

            exp.save().catch(err => console.log(err));
        }

    });

    expcooldown.add(user.id);

    setTimeout(() => {
        expcooldown.delete(user.id);
    }, 60000);
}


const antiSpamCheck = message => {

    let muteRole = message.guild.roles.find(r => r.name == 'muted');
    let muteTime = settings.antiSpamSettings.antiSpamMuteTime || 5;
    let spamAction = false;

    if(!sameSpamSet.has(message.author.id)) {
        let sameSpamBuffer = settings.antiSpamSettings.sameSpamBuffer || 5;
        sameSpamSet.set(message.author.id, [message.content]);
        setTimeout(() => {
            sameSpamSet.delete(message.author.id)
        }, sameSpamBuffer * 1000);

    } else {
        let usermsgs = sameSpamSet.get(message.author.id);
        usermsgs.push(message.content);
        let sameSpamMsgAmt = settings.antiSpamSettings.sameSpamMsgs || 5;
        while(usermsgs.length > sameSpamMsgAmt) usermsgs.shift();
        sameSpamSet.set(message.author.id, usermsgs);

        if(usermsgs.every(content => content == usermsgs[0]) && usermsgs.length >= sameSpamMsgAmt) {
            message.member.addRole(muteRole.id);
            spamAction = true;
            if(muteTime != 99.013) {
                setTimeout(() => {
                    message.member.removeRole(muteRole.id);
                }, muteTime * 60000);
            }     
        }
    } 
    

    if(!genSpamSet.has(message.author.id)) {
        let genSpamBuffer = settings.antiSpamSettings.genSpamBuffer || 5;
        genSpamSet.set(message.author.id, 1);
        setTimeout(() => {
            genSpamSet.delete(message.author.id);
        }, genSpamBuffer * 1000);

    } else {
        msgAmt = genSpamSet.get(message.author.id);
        genSpamSet.set(message.author.id, (msgAmt + 1));
        let genSpamMsgAmt = settings.antiSpamSettings.genSpamMsgs || 5;

        if(msgAmt >= genSpamMsgAmt) {
            message.member.addRole(muteRole.id);
            spamAction = true;
            if(muteTime != 99.013) {
                setTimeout(() => {
                    message.member.removeRole(muteRole.id);
                }, muteTime * 60000);
            }  
        }
    }

    return spamAction;

}

const profanityFilter = content => {

    const blacklist = settings.blacklist || [];
    const deserialized = content.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    const contentArray = deserialized.split(/ +/g);
    return contentArray.some(word => blacklist.includes(word)) || blacklist.some(profanity => content.includes(profanity));

}

const prefixCheck = (bot, message) => {
    let prefixFlag = false;

    if(message.content.startsWith('.')) {
        prefix = '.';
        prefixFlag = true;
    }

    settings.prefixes.forEach(botprefix => {
        if(message.content.startsWith(botprefix)) {
            prefix = botprefix;
            return prefixFlag = true;
        }
    });

    return prefixFlag;
}

setInterval(() => {
    settings = settingsObject();
}, 60000);