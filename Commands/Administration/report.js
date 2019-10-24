const { RichEmbed } = require("discord.js");


module.exports.run = async(Mizu, message, args) => {

    const settings = Mizu.sets;

    const rChannel = message.guild.channels.get(settings.logChannels.reportChannel);

    if(args.length == 0 && rChannel){
        message.delete();
        message.channel.send(new RichEmbed({
            color: settings.defaultEmbedColor,
            description: "I have DM'ed you to collect the report. You may also use `.report @User <Reason>` to make a report."
        }));
        message.author.send(new RichEmbed({
            color: settings.defaultEmbedColor,
            description: "Please send your report here in a single message below 1000 characters in length. Provide the tag of the User, Reason and Evidence(optional). This instance shall expire in 120 seconds."
        })).then((rMsg) => {
            rMsg.channel.awaitMessages(res => {
                if(res.author.id != Mizu.user.id){
                    
                const dmrEmbed = new RichEmbed()
                .setColor(settings.defaultEmbedColor)
                .setTitle('User Report (Type: DM)')
                .addField('Reporter :', `<@${message.author.id}> ID: ${message.author.id}`)
                .addField('Report Content:', res.content)
                .setFooter(new Date().toUTCString());

                rMsg.channel.send(new RichEmbed({
                    color: settings.defaultEmbedColor,
                    description: 'Your report has been received. You may be contacted for further information.'
                }));

                if(rChannel) rChannel.send(dmrEmbed);

                return res.content;

                }
            }, {
                max: 1,
                time: 120000,
                errors: ['time']
            }).catch(() =>{
                rMsg.channel.send(new RichEmbed({
                    color: settings.defaultEmbedColor,
                    description: 'This instance has expired.'
                }));
            });
        }).catch(err => console.log(err));

        return;
    }

    const rUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    if(!rUser || `${rUser}` == `${message.author}`){
        message.delete().catch(O_o=>{});
        return message.channel.send(new RichEmbed({
            color: settings.defaultEmbedColor,
            description: "You cannot report non-existent users or yourself."
        }));
    }

    
    const rReason = args.slice(1).join(' ');
    if(!rReason){
        message.delete().catch(O_o=>{});
        return message.channel.send(new RichEmbed({
            color: settings.defaultEmbedColor,
            description: "Please specify a reason."
        }));
    }


    const reportEmbed = new RichEmbed()
    .setTitle("User Report")
    .setColor(settings.defaultEmbedColor)
    .setThumbnail(rUser.user.displayAvatarURL)
    .addField("Reported User :", `${rUser} ID: ${rUser.id}`)
    .addField("Report Made By :", `${message.author} ID: ${message.author.id}`)
    .addField("In Channel :", message.channel)
    .setFooter(new Date().toUTCString())
    .addField("Reason :", rReason);

    
    
    message.delete().catch(O_o=>{});
    if(rChannel) rChannel.send(reportEmbed);

}

module.exports.config = {
    name: "report",
    usage: ".report (Optional: <@User/UserID> <Reason>)",
    desc: 'Reports the specified user for the specified reason or DMs the command user for the report.'
}