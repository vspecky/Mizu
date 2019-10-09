const { Client, Collection } = require('discord.js');

module.exports = class Mizu extends Client {

    /**
     * Creates an instance of Mizu.
     * @param {object} options
     * @param {string} token
     */
    constructor(options, token) {
        super(options);
        this.BOT_LOGIN_TOKEN = token;
    }

    /**
     * Takes an array of fields and initializes each field as a Collection in the Client object.
     *
     * @param {Array} collArray
     */
    initCollections(collArray) {
        collArray.forEach(field => this[field] = new Collection());
    }

    /**
     * Takes an array of handlers and initializes these handlers in the directory provided.
     *
     * @param {Array} handlerArray
     * @param {Path} path
     */
    initHandlers(handlerArray, path) {
        handlerArray.forEach(handler => require(`${path}\\${handler}`)(this));
    }

    /**
     * Initializes Mizu's web interface
     *
     * @param {AbsolutePath} path
     * @param {JSfile} indexFile
     */
    initWeb(path, indexFile) {
        require(`${path}\\${indexFile}`)(this);
    }

    /**
     * Logs in Mizu
     *
     */
    boot() {
        this.login(this.BOT_LOGIN_TOKEN);
    }

}