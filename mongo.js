const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose.connection);

const shreyaSchema = new mongoose.Schema({
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
    },
    customerId: {
        type: String, 
        required: true
    }
});

shreyaSchema.plugin(autoIncrement.plugin, {
    model: 'shreyaassi6', // Model name
    field: 'customerId', // Field to increment
    startAt: 1, // Start counter at 1
    incrementBy: 1, // Increment by 1
    format: '001' // Format counter with leading zeros
});
