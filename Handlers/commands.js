const { readdirSync, readFileSync, writeFileSync } = require('fs');
const usageEmbed = require('./usageinfo.js');
let commandjson = JSON.parse(readFileSync('./commandsinfo.json', 'utf8'));
const asciiTable = require('ascii-table');

module.exports = bot => {

    console.log(`Mizu is Booting`);

    bot.modules = {};

    const load = dir => {
        const commands = readdirSync(`./Commands/${dir}/`).filter(c => c.endsWith('.js'));
        let table = new asciiTable(`${dir} Module Booting`)
        .setHeading('', 'Commands', 'Status');
        bot.modules[`${dir}`] = true;
        let count = 0;
        for (let file of commands) {
            const pull = require(`../Commands/${dir}/${file}`);
            pull.config.module = dir;
            commandjson[pull.config.name] = pull.config;
            writeFileSync('./commandsinfo.json', JSON.stringify(commandjson, null, 2), err => {
                if(err) console.log(err);
            });
            pull.config.enabled = true;
            bot.usages.set(pull.config.name, usageEmbed(pull.config));
            bot.commands.set(pull.config.name, pull);
            if(pull.config.aliases) pull.config.aliases.forEach(alias => bot.aliases.set(alias, pull.config.name));
            count++;
            table.addRow(count, pull.config.name, 'functional');
        }
        console.log(table.toString());
    }

    ['Administration', 'CustomVoice', 'FunSFW', 'NSFW', 'Utility', 'Experience'].forEach(d => load(d));

}