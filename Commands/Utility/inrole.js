const { RichEmbed } = require('discord.js');

module.exports.run = async (bot, message, args) => {

    if(!args[0]) return message.reply('Please specify a role.')

    const role = message.guild.roles.find(r => r.name.toLowerCase() == `${args.join(" ").toLowerCase()}`);
    roleID = role.id;
    if(!roleID) return message.reply('That role does not exist.');

    const roleMems = message.guild.members.filter(m => m._roles.includes(roleID)).map(u => u.user.tag);

    if(!roleMems) return message.reply('That role has no members.');

    let pageNum = 1;

    message.channel.send(getRoleEmbed(roleMems, role, pageNum))
    .then(async msg => {

        if(roleMems.length < 16) return;
        
        await msg.react(`⬅`);
        await msg.react('➡');

        const reactfilter = (reaction, user) => (reaction.emoji.name === `➡` || reaction.emoji.name === `⬅`) && user.id === message.author.id;

        const collector = msg.createReactionCollector(reactfilter, { time: 30000 });

        collector.on('collect', reaction => {
            if(reaction.emoji.name === `⬅` && pageNum == 1) reaction.remove(message.author);
            else if(reaction.emoji.name === `➡` && pageNum == Math.ceil(roleMems.length/15)) reaction.remove(message.author);
            else if(reaction.emoji.name === `➡`) {
                pageNum++;
                reaction.remove(message.author);
                msg.edit(new RichEmbed(getRoleEmbed(roleMems, role, pageNum)));
            }
            else if(reaction.emoji.name === `⬅`) {
                pageNum--;
                reaction.remove(message.author);
                msg.edit(new RichEmbed(getRoleEmbed(roleMems, role, pageNum)));
            }
        });

        collector.on('end', collected => {
            msg.reactions.forEach(reaction => {
                reaction.remove(bot.user);
            });
        });

    })

}

const getRoleEmbed = (roleMembers, role, pageNumber) => {

    let lmiop = pageNumber * 15; // Last Member Index On Page
    
    let roleEmbed = new RichEmbed()
    .setTitle(`Users in Role: ${role.name} (Total: ${roleMembers.length})`)
    .setColor('#faf0be')
    .setFooter(`Page ${pageNumber}/${Math.ceil(roleMembers.length/15)}`);

    let roleUsers = ``;

    for (let i = (lmiop - 15); i < lmiop; i++) {
        if(!roleMembers[i]) break;
        roleUsers = roleUsers + `${roleMembers[i]}\n`;
    }

    roleUsers = roleUsers.replace(/\n$/, '');

    roleEmbed.setDescription(roleUsers);

    return roleEmbed;

}

module.exports.config = {
    name: "inrole",
    usage: "```.inrole <RoleName>```",
    desc: "Displays members having the specified role."
}