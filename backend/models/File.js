const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    tree: { type: String, required: true },
    userid: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('File', fileSchema);
