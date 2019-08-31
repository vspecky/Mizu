const mongoose = require('mongoose');

const warnSchema = mongoose.Schema({
    _id: String,
    Tag: String,
    UserID: String,
    Logs: [],
    DelLogs: []
}, {
    collection: "Warnlogs"
});

module.exports = mongoose.model("Warning", warnSchema);