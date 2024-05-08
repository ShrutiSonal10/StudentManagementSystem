const mongoose = require('mongoose');
const { Schema } = mongoose;

const StudentsSchema = new Schema({
user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'

},
name:{
    type: String,
    required: true
},
roll_number:{
    type: String,
    require: true,
    unique: true
},
contact:{
    type: Number,
    required: true
},
branch:{
    type: String,
    required: true
},
semester:{
    type: String,
    required: true
},
year:{
    type: Number,
    require: true
},
present:{
    type: Boolean,
    require: true
},
date:{
    type: Date,
    default: Date.now
}
});
module.exports=mongoose.model('students', StudentsSchema);