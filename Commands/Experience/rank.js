const { RichEmbed } = require("discord.js");
const expdatagetter = require('../../Handlers/settings.js').experience;

module.exports.run = async(Mizu,message,args) =>{

    let xpUser;

    if(args.length){
        xpUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
        if(!xpUser) return message.channel.send(new RichEmbed({
            color: Mizu.sets.defaultEmbedColor,
            description: 'The user was not found.'
        }));
    }else{
        xpUser = message.member;
    }

    const expdata = expdatagetter().expArray;

    let lvl = 0;
    let userexpdata = expdata.find(user => user.UUID == xpUser.id);
    let userexptemp = userexpdata['277888888838815744'].EXPERIENCE;
    let userexp;
    while (userexptemp >= 0) {
        userexptemp -= (5 * lvl * lvl) + (50 * lvl) + 100;
        lvl++
        if(userexptemp > 0) userexp = userexptemp;
    }

    lvl -= 1;
    const nxtlvlexp = (5 * lvl * lvl) + (50 * lvl) + 100;
    lvl--;
    const thislvlexp = (5 * lvl * lvl) + (50 * lvl) + 100;

    let xpEmbed = new RichEmbed()
    .setColor(xpUser.displayHexColor)
    .setTitle(`XP Stats: ${xpUser.user.tag}`)
    .setThumbnail(`${xpUser.user.displayAvatarURL}`)
    .addField('Level:', `${lvl + 1}`, true)
    .addField('Rank:', `${expdata.indexOf(userexpdata) + 1}/${message.guild.members.size}`, true)
    .addField('Experience:', `${userexp}/${nxtlvlexp} (Total: ${userexpdata['277888888838815744'].EXPERIENCE})`, true)
    .addField('Combo:', `${userexpdata['277888888838815744'].COMBO * 100}%`, true);

    return message.channel.send(xpEmbed);
}


module.exports.config = {
    name: "rank",
    usage: ".rank <@User(optional)>",
    desc: 'Posts the guild exp and rank stats of the user.'
}