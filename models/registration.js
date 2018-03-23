const mongoose = require('mongoose');

const registrationSchema = mongoose.Schema({
    firstName:{
        type: String,
		required: true
    },
    lastName:{
        type: String,
    },
    email:{
        type: String,
		required: true
    },
    password:{
        type: String,
		required: true
    },
    designation:{
        type: String,
		required: true
    },
    phoneNo:{
        type : Number
    }
});

const Registration = module.exports = mongoose.model('Registration', registrationSchema);


// Get Books
module.exports.getRegistrations = (callback, limit) => {
	Registration.find(callback).limit(limit);
}

// Save Registration
module.exports.saveRegistration = (registration, callback) => {
    Registration.create(registration,callback);
}

// check login
module.exports.checkLogin = ( registration , callback) => {
    Registration.findOne({ email : registration.email,password : registration.password })
    .exec((err , user)=>{
        console.log(user);
        if(err){
            throw err;
        }else if(!user){
            return callback(err);
        }
        if(user.password == registration.password){
            return callback(null,user._id);
        }else{
            return callback();
        }
    })
}