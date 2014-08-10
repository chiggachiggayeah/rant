var mongoose = require('mongoose');

var bcrypt = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({
	local : {
		
		email: String,
		password: String
	}
});

userShema.pre('save', function(next){
	var user = this;
	if (!user.isModified('password')) return next();
	bcryptSalt(10, function(err, salt){
		if(err)
			return next(err);
		bcrypt.hash(user.password, salt, function(err, hash){
			if(err) return next(err);
			user.password = hash;
			next();
		});
	});
});

userSchema.methods.comparePassword = function(candidatePassword, cb){
	bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
		if(err)
			return cb(err);
		cb(null, isMatch);
	});
};

module.exports = mongoose.model('User', userSchema);
