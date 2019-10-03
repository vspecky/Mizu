const { readdirSync } = require("fs");

module.exports = Mizu => {

    const load = dir => {
        const events = readdirSync(`./Events/${dir}/`).filter(e => e.endsWith('.js'));
        for (let file of events) {
            const evt = require(`../Events/${dir}/${file}`);
            const eName = file.split(".")[0];
            Mizu.on(eName, evt.bind(null, Mizu));
        }
    }
    ['Client', 'Guild'].forEach(d => load(d));
}