const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

// Create Schema
const VendorSchema = new Schema({
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
    shop: {
        type: String,
        enum: ['JC','VC','BBC'],
        required: true,
    },
    openingTime: {
        type: String,
        required: true,
    },
    closingTime: {
        type: String,
        required: true,
    }

});

VendorSchema.pre('save', function(next) {
    var vendor = this;
    if (!vendor.isModified('password')) {
        return next();
    }

    bcrypt.genSalt(10, function(err, salt) {
        if (err) {
            return next(err);
        }
            // hash the password using our new salt
            bcrypt.hash(vendor.password, salt, function(err, hash) {
                if (err) return next(err);
                // override the cleartext password with the hashed one  
                vendor.password = hash;
                next();
            });
    });
});

VendorSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};



module.exports = Vendor = mongoose.model("Vendor", VendorSchema);

