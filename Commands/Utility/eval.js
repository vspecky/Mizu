module.exports.run = async (bot, message, args) => {

    if(message.author.id != 375922007969366016) return;

    const clean = text => {
        if(typeof(text) == 'string'){
            return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
        } else {
            return text;
        }
    }


    try {
        const code = args.join(" ");
        let evaled = eval(code);
   
        if (typeof evaled !== "string")
          evaled = require("util").inspect(evaled);
   
        await message.channel.send(clean(evaled), {code:"xl"});
    } catch (err) {
        message.channel.send(`\`ERROR\` \`\`\`xl\n${err.stack}\n\`\`\``);
    }

}


module.exports.help = {
    name: 'eval'
}