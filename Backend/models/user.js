const mongoose = require('mongoose'); 

const userSchema = new mongoose.Schema({ 
    email: {
        type: String,
        required: true,
       
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        default: ''
    },
    address: {
        type: String,
        default: ''
    },
    profileImage: {
        type: String,
        default: ''
    }
});

const User = mongoose.model('User', userSchema); 
module.exports = User;
