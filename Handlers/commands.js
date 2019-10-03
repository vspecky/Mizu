const { readdirSync, readFileSync, writeFileSync } = require('fs');
const usageEmbed = require('../Utils/UsageInfo.js');
let commandjson = JSON.parse(readFileSync('./commandsinfo.json', 'utf8'));
const asciiTable = require('ascii-table');

/**
 * Command Handler for Mizu
 *
 * @param {*} Mizu
 */
module.exports = Mizu => {

    console.log(`Mizu is Booting`);

    Mizu.modules = {};

    /**
     * Goes into {dir} in ./Commands and loads the different modules and commands.
     *
     * @param {*} dir
     */
    const load = dir => {
        const commands = readdirSync(`./Commands/${dir}/`).filter(c => c.endsWith('.js'));
        let table = new asciiTable(`${dir} Module Booting`)
        .setHeading('', 'Commands', 'Status');
        Mizu.modules[`${dir}`] = true;
        let count = 0;
        for (let file of commands) {
            const pull = require(`../Commands/${dir}/${file}`);
            pull.config.module = dir;
            commandjson[pull.config.name] = pull.config;
            writeFileSync('./commandsinfo.json', JSON.stringify(commandjson, null, 2), err => {
                if(err) console.log(err);
            });
            pull.config.enabled = true;
            Mizu.usages.set(pull.config.name, usageEmbed(pull.config));
            Mizu.commands.set(pull.config.name, pull);
            if(pull.config.aliases) pull.config.aliases.forEach(alias => Mizu.aliases.set(alias, pull.config.name));
            count++;
            table.addRow(count, pull.config.name, 'functional');
        }
        console.log(table.toString());
    }

    ['Administration', 'CustomVoice', 'FunSFW', 'NSFW', 'Utility', 'Experience'].forEach(d => load(d));

}