const mongoose = require('mongoose');
const marriageSchema = require('../../models/marriageSchema.js');


module.exports.run = async (bot, message, args) => {

    mongoose.connect('mongodb://localhost/RATHMABOT', {
        useNewUrlParser: true
    });

    let mUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);

    if(mUser.user.bot) return message.reply('You cannot marry a bot!');

    message.channel.send(`${message.member} just proposed to ${mUser}! How sweet! Reply with \`yes\` or \`no\` please.`)
        .then(msg => {
            msg.channel.awaitMessages(res => {
                if (res.author.id == mUser.id) {
                    if (res.content.toLowerCase() === 'yes') {
                        message.guild.createRole({
                            name: `${message.member.nickname || message.author.username} ❤ ${mUser.nickname || mUser.user.username}`,
                            color: '#FF69B4',
                            mentionable: false
                        }).then(role => {
                            message.member.addRole(role);
                            mUser.addRole(role);

                            return message.channel.send(`Congratulations! ${message.member} & ${mUser} are now bangin!`);
                        });
                    } else if (res.content.toLowerCase() === 'no') {
                        return message.channel.send(`${mUser} said no! That's gotta hurt...`);
                    }
                }
            }, {
                max: 1,
                time: 120000,
                errors: ['time']
            }).catch(() => {
                message.reply(`Oops, looks like they didn't reply. Try again after some time!`);
            });
        });

}

module.exports.help = {
    name: 'marriage'
}