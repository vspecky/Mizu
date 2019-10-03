const discord = require("discord.js");

module.exports.run = async(Mizu,message,args) =>{

    if(!args[2]) return message.reply("Please ask a question.");


    let replies = ['Deep within, you already possess the answer.', 'I cannot answer your question, but magnamus can.', 'The Divine Ones answer favorably.',
'And then you take... I\'m sorry I wasn\'t listening.', 'Ask this question to yourself in the mirror 3 times and you shall have the answer',
'The answer is unclear... Seriously, I double-checked.', 'No... I mean Yes... I mean ask me again later.', 'If you think I\'m answering that, you\'re mistaking me for someone else',
'The Divine Ones do not wish it.', 'The Divine Ones wish it.', 'The Divine Ones look upon you with favor.', 'My sources are unclear.','It is a coin flip really...',
'Why don\'t you whisper it to magnamus and ask what he thinks?','I suggest you ask magnamus... If you can find him that is.'];

    let result = Math.floor((Math.random() * replies.length));

    message.reply(`${replies[result]}`);

}


module.exports.config = {
    name: "8ball",
    usage: "j!8ball question"
}