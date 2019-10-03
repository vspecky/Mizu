const { token } = require("../tokenc.json");
const MizuClient = require('./Utils/MizuClient.js');
const path = require('path');

const Mizu = new MizuClient({ disableEveryone: true });
Mizu.initCollections(['commands', 'aliases', 'usages']);
Mizu.initHandlers(['commands', 'events', 'settings'], path.join(__dirname, 'Handlers'));
Mizu.login(token);