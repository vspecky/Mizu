const fs = require('fs');
const botprefix = require("../../JSON/prefixc.json");
const mongoose = require('mongoose');
const expschema = require('../../models/expSchema.js');
let cooldown = new Set();
let combocooldown = new Set();
let xp = JSON.parse(fs.readFileSync("./JSON/xp.json", "utf8"));

module.exports = async (bot, message) => {

    if (message.author.bot) return;
    if (message.channel.type === "dm") return;

    if(!combocooldown.has(message.author.id)) combocooldown.add(message.author.id);

    if (!cooldown.has(message.author.id) && !message.member.user.bot) {
        cooldown.add(message.author.id);

        
        mongoose.connect('mongodb://localhost/RATHMABOT', {
            useNewUrlParser: true
        });

        expschema.findOne({ UUID: message.author.id }, (err, exp) => {
            if(err) console.log(err);

            let xpAdd = Math.ceil(Math.random() * 10) + 15;

            if (!exp) {
                const newexp = new expschema({
                    UUID: message.author.id,
                    'LAST KNOWN USERNAME': message.author.username,
                    '277888888838815744' : {
                        EXPERIENCE: xpAdd,
                        'WEEKLY EXPERIENCE': xpAdd,
                        COMBO: 0.04
                    }
                });

                newexp.save().catch(err => console.log(err));
            } else {
                xpAdd += xpAdd * exp['277888888838815744'].COMBO;
                exp['277888888838815744'].EXPERIENCE += xpAdd;
                exp['277888888838815744']['WEEKLY EXPERIENCE'] += xpAdd;

                exp.save().catch(err => console.log(err));
            }

        });
        

    }

    let prefix = botprefix.prefix;
    let messageArray = message.content.split(/ +/g);
    let cmd = messageArray[0].slice(prefix.length).toLowerCase();
    let args = messageArray.slice(1);


    let commandFile = bot.commands.get(cmd);

    if (commandFile) {
        commandFile.run(bot, message, args);
    }

    setTimeout(() => {
        cooldown.delete(message.author.id);
    }, 60000);

    setTimeout(() => {
        combocooldown.delete(message.author.id)
    }, 120000)

}

setInterval(() => {
    mongoose.connect('mongodb://localhost/RATHMABOT', {
        useNewUrlParser: true
    });

    combocooldown.forEach(userid => {
        mongoose.findOne({ UUID: userid }, (err, exp) => {

        })
    })
}, 120000);
