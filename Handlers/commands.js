const { readdirSync } = require('fs');

module.exports = bot => {
    const load = dir => {
        const commands = readdirSync(`./Commands/${dir}/`).filter(c => c.endsWith('.js'));
        for (let file of commands) {
            const pull = require(`../Commands/${dir}/${file}`);
            bot.commands.set(pull.help.name, pull); 
        }
        console.log(`${dir} modules functional.`);
    }

    ['Administration', 'Custom Voice', 'Fun SFW', 'NSFW', 'Utility'].forEach(d => load(d));
}