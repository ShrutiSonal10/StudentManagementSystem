const mongoose = require('mongoose');
// import mongoose from 'mongoose';
const { Schema } = mongoose;

const UserSchema = new Schema({
name:{
    type: String,
    required: true
},
email:{
    type: String,
    require: true,
    unique: true
},
password:{
    type: String,
    required: true
},
date:{
    type: Date,
    default: Date.now
}
});
module.exports=mongoose.model('user', UserSchema);