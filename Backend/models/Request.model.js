import mongoose from 'mongoose';

const requestSchema = new mongoose.Schema({

    username:{
        type: String,
        required: true
    },
    requestMessage:{
        type: String,
        required: true,
        match: /^[\s\S]{1,500}$/
    },
    status:{
        type: String,
        enum: ['pending', 'approved', 'denied'],
        default: 'pending'
    },
    password:{
        type: String,
        required: true,
        match: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{8,}$/ 
    },
    requestedRole:{
        type: String,
        enum:[ 'user', 'admin'],
        default: 'user'
    }

}, { timestamps: true });



const Request = mongoose.model('Request', requestSchema, 'requests');
export default Request;
