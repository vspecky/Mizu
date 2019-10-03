const { connect } = require('mongoose');
const expschema = require('../models/expSchema.js');
const expcooldown = new Set();
const commandcooldown = new Set();
const modmailset = new Set();
const genSpamSet = new Map();
const sameSpamSet = new Map();

module.exports = class MessageUtils {

    /**
    * Addition of Experience to the user.
    *
    * @param {UserResolvable} user
    * @param {GuildSettings} settings
    */
    Experience(user, settings) {

        if(expcooldown.has(user.id)) return;

        connect('mongodb://localhost/RATHMABOT', {
            useNewUrlParser: true
        });
    
        expschema.findOne({ UUID: user.id }, (err, exp) => {
            if (err) console.log(err);

            const low = settings.expSettings.lowestExp || 15;
            const high = settings.expSettings.highestExp || 25;
            let xpAdd = Math.ceil(Math.random() * (high - low)) + low;
            const xpmult = settings.expSettings.expMultiplier || 1;
    
            if (!exp) {
                const newexp = new expschema({
                    UUID: user.id,
                    'LAST KNOWN USERNAME': user.username,
                    '277888888838815744': {
                        EXPERIENCE: xpAdd,
                        'WEEKLY EXPERIENCE': xpAdd,
                        COMBO: 0
                    }
                });
    
                newexp.save().catch(err => console.log(err));
            } else {
                if (Date.now() - exp['277888888838815744']['LAST MESSAGE'] <= (settings.expSettings.comboInterval || 120000)) {
                    if (exp['277888888838815744'].COMBO < ((settings.expSettings.maxCombo/100) || 0.20)) exp['277888888838815744'].COMBO += (settings.expSettings.comboIncrement || 0.04);
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
        }, (settings.expSettings.expCooldown || 60000));

    }

    /**
    * Checks if the message content starts with a prefix and returns the prefix if yes, else returns False.
    *
    * @param {MessageContent} content
    * @param {GuildSettings} settings
    * @returns Prefix or False
    */
    PrefixCheck(content, settings) {

        if(content.startsWith('.')) {
            return '.';
        }
    
        const possPrefixes = settings.prefixes || [];
        let prefix = false;
    
        possPrefixes.forEach(Mizuprefix => {
            if(content.startsWith(Mizuprefix)) return prefix = Mizuprefix;
        });
    
        return prefix;
    }

    /**
    * Takes a Direct Message and pastes it in a ModMail channel if it's detailed enough, else tells the user to be more detailed.
    *
    * @param {Message} message
    * @param {Client} client
    */
    ModMail(message, client) {

        if(modmailset.has(message.author.id)) return;
    
        const channel = client.guilds.get('592207697240391683').channels.get(client.sets.modMailChannel);
    
        if(!channel) return;
    
        if(message.content.split(/ +/).length < 20) {
            modmailset.add(message.author.id);
            client.setTimeout((ID) => {
                modmailset.delete(ID)
            }, 300000, message.author.id);
    
            return message.channel.send(new RichEmbed({
                description: 'Please be more detailed. Try again after 5 minutes.',
                color: client.sets.defaultEmbedColor
            }));
    
        } else {
    
            const modMailEmbed = new RichEmbed({
                title: `ModMail: ${message.author.tag} (${message.author.id})`,
                thumbnail: message.author.displayAvatarURL,
                description: message.content,
                color: client.sets.defaultEmbedColor
            });
    
            modmailset.add(message.author.id)
    
            client.setTimeout((ID) => {
                modmailset.delete(ID)
            }, 86400000, message.author.id);
    
            return channel.send(modMailEmbed);
        }
    
    }

    /**
    * Function acting as a spam flagger and as a punisher.
    *
    * @param {Message} message
    * @param {GuildSettings} settings
    * @returns spamFlag (True if spam is detected, False otherwise)
    */
    AntiSpam(message, settings) {

        try {
    
            const muteRole = settings.muteRole;
            const muteTime = settings.antiSpamSettings.antiSpamMuteTime || 300000;
            let spamAction = false;
    
            if(!sameSpamSet.has(message.author.id)) {
                const sameSpamBuffer = settings.antiSpamSettings.sameSpamBuffer || 5000;
                sameSpamSet.set(message.author.id, [message.content]);
                setTimeout(() => {
                    sameSpamSet.delete(message.author.id)
                }, sameSpamBuffer);
    
            } else {
                const usermsgs = sameSpamSet.get(message.author.id);
                usermsgs.push(message.content);
                const sameSpamMsgAmt = settings.antiSpamSettings.sameSpamMsgs || 5;
                while(usermsgs.length > sameSpamMsgAmt) usermsgs.shift();
                sameSpamSet.set(message.author.id, usermsgs);
    
                if(usermsgs.every(content => content == usermsgs[0]) && usermsgs.length >= sameSpamMsgAmt) {
                    if(muteRole) {
                        message.member.addRole(muteRole);
                        spamAction = true;
                        if(muteTime != 99.013) {
                            setTimeout(() => {
                                message.member.removeRole(muteRole);
                            }, muteTime);
                        }
                    }     
                }
            } 
            
    
            if(!genSpamSet.has(message.author.id)) {
                const genSpamBuffer = settings.antiSpamSettings.genSpamBuffer || 5000;
                genSpamSet.set(message.author.id, 1);
                setTimeout(() => {
                    genSpamSet.delete(message.author.id);
                }, genSpamBuffer);
    
            } else {
                const msgAmt = genSpamSet.get(message.author.id);
                genSpamSet.set(message.author.id, (msgAmt + 1));
                const genSpamMsgAmt = settings.antiSpamSettings.genSpamMsgs || 5;
    
                if(msgAmt >= genSpamMsgAmt) {
                    if(muteRole) {
                        message.member.addRole(muteRole);
                        spamAction = true;
                        if(muteTime != 99.013) {
                            setTimeout(() => {
                                message.member.removeRole(muteRole);
                            }, muteTime);
                        }
                    }  
                }
            }
    
            return spamAction;
    
        } catch(err) {
            console.log(err);
        }
    }

    /**
    * Analyzes the message content string, checks for profanity, and returns a flag.
    *
    * @param {MessageContent} content
    * @param {GuildSettings} settings
    * @returns profanityFlag (True if profanity is detected, False otherwise)
    */
    ProfanityFilter(content, settings) {

        const blacklist = settings.blacklist || [];
        const deserialized = content.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
        const contentArray = deserialized.split(/ +/g);
        return contentArray.some(word => blacklist.includes(word)) || blacklist.some(profanity => content.includes(profanity));
    
    }

    /**
     * Checks for various conditions and executes a command.
     *
     * @param {Message} message
     * @param {Client} client
     * @param {CommandPrefix} prefix
     * @returns
     */
    Command(message, client, prefix) {

        const messageArray = message.content.split(/ +/g);
        const cmd = messageArray[0].slice(prefix.length).toLowerCase();
        const args = messageArray.slice(1);
        const commandFile = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
        if(!commandFile) return this.Experience(message.author, client.sets);
        if(this.ProfanityFilter(message.content, client.sets) && (commandFile.config.name !== 'blacklistadd' && commandFile.config.name !== 'blacklistdel')) return message.delete();
    
        if(!commandFile.config.enabled || !client.modules[commandFile.config.module]) return;
    
        if(client.sets.modBlockedChannels) {
            if(client.sets.modBlockedChannels[commandFile.config.module]) {
                if(client.sets.modBlockedChannels[commandFile.config.module].includes(message.channel.id)) return;
            }
        }
    
        if (commandFile && !commandcooldown.has(message.author.id)) {
            commandcooldown.add(message.author.id);
            client.setTimeout((ID) => {
                commandcooldown.delete(ID);
            }, 5000, message.author.id);
            
            return commandFile.run(client, message, args);
        }
    
    }

}