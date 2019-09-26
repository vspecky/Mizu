const { readdirSync } = require("fs");

module.exports = bot => {

    const load = dir => {
        const events = readdirSync(`./Events/${dir}/`).filter(e => e.endsWith('.js'));
        for (let file of events) {
            const evt = require(`../Events/${dir}/${file}`);
            const eName = file.split(".")[0];
            bot.on(eName, evt.bind(null, bot));
        }
    }
    ['Client', 'Guild'].forEach(d => load(d));
}