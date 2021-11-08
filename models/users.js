const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name: {
        type: String , 
        required : true 
    } , 
    url :{
        type: String , 
        required : true
    }
     ,
     details :{
         type:String ,
         required: true 
     }
     , created:{
         type: Date , 
         required:true ,
         default:Date.now
     }

})

module.exports =  mongoose.model('User' , userSchema );
