const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

mongoose.connect("mongodb://0.0.0.0:27017/cheyadb38")
    .then(() => {
        console.log("mongodb connected");
    })
    .catch(() => {
        console.log('error');
    });

autoIncrement.initialize(mongoose.connection);

const shivaSchema = new mongoose.Schema({
    _id: Number,
    Name: {
        type: String,
        required: true
    },
    Phone: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    feedback: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    }
});

shivaSchema.plugin(autoIncrement.plugin, { model: 'cheyaassi6', field: '_id', startAt: 1, incrementBy: 1 });

const collection = mongoose.model('cheyaassi6', shivaSchema);

module.exports = collection;
