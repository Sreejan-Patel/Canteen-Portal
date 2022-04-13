const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

// Create Schema
const BuyerSchema = new Schema({
    name: {
		type: String,
		required: true
	},
	email: {
        type: String,
        lowercase: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },      
    type: {
        type: String,
        enum: ["Buyer", "Vendor"],
        required: true,
    },
    mobile: {
        type: Number,
        required: true,
    },
    age:   {
        type: Number,
        required: true,
    },
    batch: {
        type: String,
        enum: ['UG1','UG2','UG3','UG4','UG5'],
        required: true,
    }

});

BuyerSchema.pre('save', function(next) {
    var buyer = this;
    if (!buyer.isModified('password')) {
        return next();
    }

    bcrypt.genSalt(10, function(err, salt) {
        if (err) {
            return next(err);
        }
        // hash the password using our new salt
        bcrypt.hash(buyer.password, salt, function(err, hash) {
            if (err) return next(err);
            // override the cleartext password with the hashed one  
            buyer.password = hash;
            next();
        });
    });
});

BuyerSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

module.exports = Buyer = mongoose.model("Buyer", BuyerSchema);