const { readdirSync, readFileSync, writeFileSync } = require('fs');
const usageEmbed = require('./usageinfo.js');
let commandjson = JSON.parse(readFileSync('./commandsinfo.json', 'utf8'));

module.exports = bot => {
    const load = dir => {
        const commands = readdirSync(`./Commands/${dir}/`).filter(c => c.endsWith('.js'));
        for (let file of commands) {
            const pull = require(`../Commands/${dir}/${file}`);
            bot.usages.set(pull.config.name, usageEmbed(pull.config));
            bot.commands.set(pull.config.name, pull);
            commandjson[pull.config.name] = pull.config;
            writeFileSync('./commandsinfo.json', JSON.stringify(commandjson, null, 2), err => {
                if(err) console.log(err);
            });
            if(pull.config.aliases) pull.config.aliases.forEach(alias => bot.aliases.set(alias, pull.config.name));
        }
        console.log(`${dir} modules functional.`);
    }

    ['Administration', 'Custom Voice', 'Fun SFW', 'NSFW', 'Utility'].forEach(d => load(d));
}