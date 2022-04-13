var express = require("express");
var router = express.Router();
var bcrypt = require("bcrypt")

const Buyer = require("../models/Buyer");


// @route           GET /buyer/
// @desc            Get all vendors

router.get("/", function(req, res) {
    Buyer.find(function(err, users) {
		if (err) {
			console.log(err);
		} else {
			res.json(users);
		}
	})
});


// @route 			POST /buyer/register
// @desc 			Register a new buyer
router.post("/register", function(req, res) {
	const newBuyer = new Buyer({
		name: req.body.name,
		email: req.body.email,
		password: req.body.password,
		type: req.body.type,
		mobile: req.body.mobile,
        age: req.body.age,
        batch: req.body.batch,
});

	Buyer.findOne({ email: req.body.email }, function(err, user) {
		if (err) {
			console.log(err);
		} else if (user) {
			res.json({
				status: "Email already exists"
			});
		} else {
			newBuyer
				.save()
				.then(() => {
					newBuyer => res.status(200).json(newBuyer)
					res.json({
						status: "Buyer registered successfully"
					})
				})
				.catch((err) => {
					newBuyer
						.delete()
						.then(() => {
							res.status(400).json(err);
						})
						.catch((err) => {
							res.json({ error: err });
						});
					err;
				});
		}
	});
});

// @route 			POST /buyer/login	
// @desc 			Login a buyer
router.post("/login", function(req, res) {
	Buyer.findOne({ email: req.body.email }, function(err, user) {
		if (err) {
			res.json(err).status(400);
		} else if (!user) {
			res.json({
				status: "Email does not exist"
			});
		} else {
			user.comparePassword(req.body.password, function(error, isMatch) {
				if (error) {
					res.json(error).status(400);
				} else if (!isMatch) {
					res.json({
						status: "Password is incorrect"
					});
				} else {
					res.status(200).json({status:"success"});
				}
			});
		}
	});
});


// @route 			POST /buyer/email
// @desc 			Get a buyer by email
router.post("/email",(req, res) => {
    Buyer.findOne({ email: req.body.email }, function(err, user) {
		if (err) {
			res.json(err).status(400);
		} else if (!user) {
			res.json({
				status: "Buyer does not exist"
			});
		} else {
			res.status(200).json(user);
		}
	});
});


///////////////////////////////////////////

// @route 			POST /buyer/update
// @desc 			Update a buyer


// @route 			POST /buyer/update/name
// @desc 			Update a buyer's name

router.post("/update/name",(req, res) => {
	Buyer.findOne({ email: req.body.email }, function(err, user) {
		if (err) {
			res.json(err).status(400);
		} else if (!user) {
			res.json({
				status: "Buyer does not exist"
			});
		} else {
			user.name = req.body.name;
			user.save()
				.then(() => {
					res.status(200).json(user);
				})
				.catch((err) => {
					res.json({ error: err });
				});
		}
	});
});

// @route 			POST /buyer/update/age
// @desc 			Update a buyer's age

router.post("/update/age",(req, res) => {
	Buyer.findOne({ email: req.body.email }, function(err, user) {
		if (err) {
			res.json(err).status(400);
		} else if (!user) {
			res.json({
				status: "Buyer does not exist"
			});
		} else {
			user.age = req.body.age;
			user.save()
				.then(() => {
					res.status(200).json(user);
				})
				.catch((err) => {
					res.json({ error: err });
				});
		}
	});
});

// @route 			POST /buyer/update/mobile
// @desc 			Update a buyer's mobile

router.post("/update/mobile",(req, res) => {
	Buyer.findOne({ email: req.body.email }, function(err, user) {
		if (err) {
			res.json(err).status(400);
		} else if (!user) {
			res.json({
				status: "Buyer does not exist"
			});
		} else {
			user.mobile = req.body.mobile;
			user.save()
				.then(() => {
					res.status(200).json(user);
				})
				.catch((err) => {
					res.json({ error: err });
				});
		}
	});
});

// @route 			POST /buyer/update/batch
// @desc 			Update a buyer's batch

router.post("/update/batch",(req, res) => {
	Buyer.findOne({ email: req.body.email }, function(err, user) {
		if (err) {
			res.json(err).status(400);
		} else if (!user) {
			res.json({
				status: "Buyer does not exist"
			});
		} else {
			user.batch = req.body.batch;
			user.save()
				.then(() => {
					res.status(200).json(user);
				})
				.catch((err) => {
					res.json({ error: err });
				});
		}
	});
});



////////////////////////////////////////////




module.exports = router;