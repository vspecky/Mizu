const botprefix = require("./JSON/prefixc.json");
const bottoken = require("../tokenc.json");
const discord = require('discord.js');
const fs = require("fs");
const bot = new discord.Client({ disableEveryone: true });
bot.commands = new discord.Collection();
const xp = JSON.parse(fs.readFileSync("./JSON/xp.json", "utf8"));
let cooldown = new Set();
let oofchestSet = [];
let vcPerks = new Map();
let custvcadmin = new Map();


// {START} Functions when bot is ready.
bot.on("ready", async () => {
    console.log(`${bot.user.username} is online.`);
    bot.user.setActivity("YouTube with Spec", { type: "Watching" });
});
// {END} Functions when bot is ready



// {START} Functions when Bot is Disconnected/Reconnecting
bot.on("disconnect", () => console.log('Jun Watarase has disconnected.'));

bot.on("reconnecting", () => console.log('Jun Watarase is attempting to reconnect.'));
// {END} Functions when Bot is Disconnected/Reconnecting



// {START} Universal Command Handler
fs.readdir("./Commands/Administration/", (err, files) => {

    if (err) {
        console.log(err);
    }

    let jsfile = files.filter(f => f.split(".").pop() === "js");

    if (jsfile.length <= 0) {
        console.log("Couldn't find Administration commands.");
        return;
    }

    jsfile.forEach((f, i) => {
        let props = require(`./Commands/Administration/${f}`);
        bot.commands.set(props.help.name, props);

    });

    console.log("Administration modules functional.");

});



fs.readdir("./Commands/Fun SFW/", (err, files) => {

    if (err) {
        console.log(err);
    }

    let jsfile = files.filter(f => f.split(".").pop() === "js");

    if (jsfile.length <= 0) {
        console.log("Couldn't find Fun SFW commands.");
        return;
    }

    jsfile.forEach((f, i) => {
        let props = require(`./Commands/Fun SFW/${f}`);
        bot.commands.set(props.help.name, props);

    });

    console.log("Fun SFW modules functional.");

});



fs.readdir("./Commands/Utility/", (err, files) => {

    if (err) {
        console.log(err);
    }

    let jsfile = files.filter(f => f.split(".").pop() === "js");

    if (jsfile.length <= 0) {
        console.log("Couldn't find Utility commands.");
        return;
    }

    jsfile.forEach((f, i) => {
        let props = require(`./Commands/Utility/${f}`);
        bot.commands.set(props.help.name, props);

    });

    console.log("Utility modules functional.");

});



fs.readdir("./Commands/NSFW/", (err, files) => {

    if (err) {
        console.log(err);
    }

    let jsfile = files.filter(f => f.split(".").pop() === "js");

    if (jsfile.length <= 0) {
        console.log("Couldn't find NSFW commands.");
        return;
    }

    jsfile.forEach((f, i) => {
        let props = require(`./Commands/NSFW/${f}`);
        bot.commands.set(props.help.name, props);

    });

    console.log("NSFW modules functional.");

});



fs.readdir("./Commands/Custom Voice/", (err, files) => {

    if (err) {
        console.log(err);
    }

    let jsfile = files.filter(f => f.split(".").pop() === "js");

    if (jsfile.length <= 0) {
        console.log("Couldn't find Custom Voice commands.");
        return;
    }

    jsfile.forEach((f, i) => {
        let props = require(`./Commands/Custom Voice/${f}`);
        bot.commands.set(props.help.name, props);

    });

    console.log("Custom Voice modules functional.");

});


bot.on("message", async message => {
    // Commands Initiator

    if (message.author.bot) return;
    if (message.channel.type === "dm") return;

    if (!cooldown.has(message.author.id) && message.author.id != bot.user.id) {
        cooldown.add(message.author.id);

        if (!xp[message.author.id]) {
            xp[message.author.id] = {
                txp: 0,
                lvl: 1,
                nlxp: 0
            };
        }

        let xpAdd = Math.floor(Math.random() * 6) + 10;
        xp[message.author.id].txp += xpAdd;
        xp[message.author.id].nlxp += xpAdd;
        let nxtlvl = xp[message.author.id].lvl * 50;

        if (nxtlvl <= xp[message.author.id].nlxp) {
            xp[message.author.id].lvl += 1;
            xp[message.author.id].nlxp = 0;
        }

        fs.writeFile('./JSON/xp.json', JSON.stringify(xp), (err) => {
            if (err) console.log(err);
        });

    }

    let prefix = botprefix.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);


    let commandFile = bot.commands.get(cmd.slice(prefix.length));

    if (commandFile) {
        commandFile.run(bot, message, args);
    }

    setTimeout(() => {
        cooldown.delete(message.author.id);
    }, 60000);

});
// {END} Universal Command Handler

bot.on("messageDelete", async message => {

    let logch = message.guild.channels.find(`name`, "moderation");
    if (!logch) return message.channel.send("Couldn't find channel for msg delete logs");

    let dUser = message.member;
    let dIcon = dUser.user.displayAvatarURL;

    let preslice = message.content.split(" ");
    let prefix = preslice[0].slice(0, 2);

    if (prefix === "j!") return;

    let logEmbed = new discord.RichEmbed()
        .setColor("#8E5BC5")
        .setDescription("Deleted Message")
        .setThumbnail(dIcon)
        .addField("Deleted Message :", message)
        .addField("By User :", `<@${dUser.id}>`)
        .setFooter(message.createdAt)
        .addField("In Channel :", message.channel);

    logch.send(logEmbed);


});


bot.on("messageReactionAdd", async (messageReaction, user) => {

    let rCount = 0;
    if(messageReaction._emoji.name == `😏` && user.id != messageReaction.message.author.id) rCount++;

    if (rCount == 2 && !oofchestSet.includes(messageReaction.message.id)) {
        oofChan = messageReaction.message.guild.channels.find(`name`, "privtest");
        let oofEmbed = new discord.RichEmbed()
            .setColor(`${messageReaction.message.member.displayHexColor}`)
            .setAuthor(`${messageReaction.message.author.username}`, `${messageReaction.message.author.displayAvatarURL}`)
            .addField('Message Link:', `Click [Here](https://discordapp.com/channels/${messageReaction.message.guild.id}/${messageReaction.message.channel.id}/${messageReaction.message.id}) to Go to the Message`)
            .setFooter(`${messageReaction.message.guild.name} | #${messageReaction.message.channel.name}`)
            .setTimestamp();
        
        if(messageReaction.message.content) oofEmbed.setDescription(`${messageReaction.message.content}`);

        if (messageReaction.message.embeds.length > 0 && messageReaction.message.embeds[0].type == 'image') {
            oofEmbed.setImage(`${messageReaction.message.embeds[0].url}`);
                
        } else if (messageReaction.message.attachments.size > 0) {
            oofEmbed.setImage(`${messageReaction.message.attachments.map((u) => { return u.url; })[0]}`);

        }

        oofchestSet.push(messageReaction.message.id);

        if (oofchestSet.length >= 50) {
            oofchestSet.shift();
        }

        return oofChan.send(oofEmbed);
    }
});

        
        
bot.on("voiceStateUpdate", async (oldMember, newMember) => {

    if (newMember.voiceChannelID == 607592608641974324) {

        if (vcPerks.get(newMember.id)) {
            newMember.setVoiceChannel(null);
            return newMember.send(`You already have a custom room in ${newMember.guild.name}!`);
        }

        newMember.guild.createChannel(`⏱`, {
            type: 'voice',
            parent: '592207697701634062'
        }).then(async (newVC) => {
            newMember.setVoiceChannel(newVC.id);
            let name = newMember.user.username;
            if (newMember.nickname) { name = newMember.nickname; }
            if (newMember.presence.game) {
                newVC.setName(`${name}'s ${newMember.presence.game} Room`);
            } else {
                newVC.setName(`${name}'s Room`);
            }

            vcPerks.set(`${newMember.id}`, `${newVC.id}`);
            custvcadmin.set(`${newVC.id}`, `${newMember.id}`);
        });

    }

    
    if (oldMember.voiceChannel) {
        if (!oldMember.voiceChannel.members.first() && oldMember.voiceChannelID != 607592608641974324) {
            oldMember.voiceChannel.delete();

            vcPerks.delete(`${custvcadmin.get(oldMember.voiceChannel.id)}`);

            if (oldMember.guild.channels.find(`id`, `592207697701634062`).children.map(c => c.type).filter(x => x === 'voice').length == 1) {
                vcPerks.clear();
                custvcadmin.clear();
            }
        }
    }
    



});


bot.login(bottoken.token);

module.exports = {
    vcPerks
}