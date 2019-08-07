const discord = require("discord.js");


module.exports.run = async(bot, message, args) => {
    

        let rChannel = message.guild.channels.find(`name`, "moderation");
        if(!rChannel){
            return message.channel.send("Couldn't find the moderation channel.");
        }



        if(args.length == 0){
            message.delete();
            message.channel.send("I have DM'ed you to collect the report. You may also use `j!report @User Reason` to make a report.");
            message.author.send("Please send your report here in a single message below 1000 characters in length. Provide the tag of the User, Reason and Evidence(optional). This instance shall expire in 120 seconds")
            .then((rMsg) => {
                rMsg.channel.awaitMessages(res => {
                    if(res.author.id != bot.user.id){
                        
                    let dmrEmbed = new discord.RichEmbed()
                    .setColor('#8E5BC5')
                    .setTitle('User Report (Type: DM)')
                    .addField('Reporter :', `<@${message.author.id}> ID: ${message.author.id}`)
                    .addField('Report Content:', res.content)
                    .setFooter(message.createdAt);

                    rMsg.channel.send('Your report has been received. You may be contacted for further information.');

                    rChannel.send(dmrEmbed);

                    return res.content;

                    }
                }, {
                    max: 1,
                    time: 120000,
                    errors: ['time']
                }).catch(() =>{
                    rMsg.channel.send('This instance has expired.');
                });
            });

            return;
        }

        let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!rUser || `${rUser}` == `${message.author}`){
            message.delete().catch(O_o=>{});
            return message.channel.send("You cannot report non-existent users or yourself.");
        }

        
        let rReason = args.join(" ").slice(22);
        if(!rReason){
            message.delete().catch(O_o=>{});
            return message.channel.send("Please specify a reason.");
        }

        let rIcon = rUser.user.displayAvatarURL;

        let reportEmbed = new discord.RichEmbed()
        .setTitle("User Report")
        .setColor("#8E5BC5")
        .setThumbnail(rIcon)
        .addField("Reported User :", `${rUser} ID: ${rUser.id}`)
        .addField("Report Made By :", `${message.author} ID: ${message.author.id}`)
        .addField("In Channel :", message.channel)
        .setFooter(message.createdAt)
        .addField("Reason :", rReason);

        
        
        message.delete().catch(O_o=>{});
        rChannel.send(reportEmbed);

}

module.exports.help = {
    name: "report"
}