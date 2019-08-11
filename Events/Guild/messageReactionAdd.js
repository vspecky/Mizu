const { RichEmbed } = require('discord.js');
let oofchestSet = [];

module.exports = async (bot, messageReaction, user) => {

    let rCount = 0;
    if(messageReaction._emoji.name == `😏` && user.id != messageReaction.message.author.id) rCount++;

    if (rCount == 2 && !oofchestSet.includes(messageReaction.message.id)) {
        oofChan = messageReaction.message.guild.channels.find(`name`, "privtest");
        let oofEmbed = new RichEmbed()
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

}