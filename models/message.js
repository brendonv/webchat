var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var messageSchema = new Schema({
    created: {type: Date, index: true},
    creator: {type: Schema.Types.ObjectId, ref: 'User'},
    content: String
});

var Message = mongoose.model('Message', messageSchema);
module.exports = Message;