const procargs = process.argv;

if(procargs[2] == 'boot') {
    const { token } = require("../tokenc.json");
    const MizuClient = require('./Utils/MizuClient.js');
    const path = require('path');

    const Mizu = new MizuClient({ disableEveryone: true }, token);
    Mizu.initCollections(['commands', 'aliases', 'usages']);
    Mizu.initHandlers(['commands', 'events', 'settings'], path.join(__dirname, 'Handlers'));
    Mizu.boot();

    if(procargs[3] == 'webinit') {
        Mizu.initWeb(path.join(__dirname, 'Web'), 'mizuweb');
    }

} else {
    console.log('pls say boot');
}