var express = require("express");
var router = express.Router();


const Vendor = require("../models/Vendor");
const FoodItem = require("../models/FoodItem");



// @route           GET /vendor/
// @desc            Get all vendors

router.get("/", function(req, res) {
    Vendor.find(function(err, users) {
		if (err) {
			console.log(err);
		} else {
			res.json(users);
		}
	})
});


// @route 			POST /vendor/register
// @desc 			Register a new vendor

router.post("/register", function(req, res) {
	const newVendor = new Vendor({
		name: req.body.name,
		email: req.body.email,
		password: req.body.password,
		type: req.body.type,
		mobile: req.body.mobile,
		shop: req.body.shop,
		openingTime: req.body.openingTime,
		closingTime: req.body.closingTime,

	});

	Vendor.findOne({ email: req.body.email }, function(err, user) {
		if (err) {
			console.log(err);
		} else if (user) {
			res.json({
				status: "Email already exists"
			});
		} else {
			newVendor
				.save()
				.then(() => {
					newVendor => res.status(200).json(newVendor)
					res.json({
						status: "Vendor registered successfully"
					})
				})
				.catch((err) => {
					newVendor
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

// @route 			POST /vendor/login	
// @desc 			Login a vendor

router.post("/login", function(req, res) {
	Vendor.findOne({ email: req.body.email }, function(err, user) {
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

// @route 			POST /vendor/email
// @desc 			Get a vendor by email
router.post("/email",(req, res) => {
    Vendor.findOne({ email: req.body.email }, function(err, user) {
		if (err) {
			res.json(err).status(400);
		} else if (!user) {
			res.json({
				status: "Vendor does not exist"
			});
		} else {
			res.status(200).json(user);
		}
	});
});


///////////////////////////////////////////

// @route 			POST /vendor/update
// @desc 			Update a vendor


// @route 			POST /vendor/update/name
// @desc 			Update a vendor's name

router.post("/update/name",(req, res) => {
	Vendor.findOne({ email: req.body.email }, function(err, user) {
		if (err) {
			res.json(err).status(400);
		} else if (!user) {
			res.json({
				status: "Vendor does not exist"
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

// @route 			POST /vendor/update/age
// @desc 			Update a vendor's shop

router.post("/update/shop",(req, res) => {
	Vendor.findOne({ email: req.body.email }, function(err, user) {
		if (err) {
			res.json(err).status(400);
		} else if (!user) {
			res.json({
				status: "Vendor does not exist"
			});
		} else {
			user.shop = req.body.shop;
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

// @route 			POST /vendor/update/mobile
// @desc 			Update a vendor's mobile

router.post("/update/mobile",(req, res) => {
	Vendor.findOne({ email: req.body.email }, function(err, user) {
		if (err) {
			res.json(err).status(400);
		} else if (!user) {
			res.json({
				status: "Vendor does not exist"
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

// @route 			POST /vendor/update/opening
// @desc 			Update a vendor's opening time

router.post("/update/opening",(req, res) => {
	Vendor.findOne({ email: req.body.email }, function(err, user) {
		if (err) {
			res.json(err).status(400);
		} else if (!user) {
			res.json({
				status: "Vendor does not exist"
			});
		} else {
			user.openingTime = req.body.openingTime;
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

// @route 			POST /vendor/update/closing
// @desc 			Update a vendor's closing time

router.post("/update/closing",(req, res) => {
	Vendor.findOne({ email: req.body.email }, function(err, user) {
		if (err) {
			res.json(err).status(400);
		} else if (!user) {
			res.json({
				status: "Vendor does not exist"
			});
		} else {
			user.closingTime = req.body.closingTime;
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

////////////////////////////////////

// @route           GET /fooditem/
// @desc            Get all FoodItems

router.get("/fooditem/", function(req, res) {
    FoodItem.find(function(err, items) {
		if (err) {
			console.log(err);
		} else {
			res.json(items);
		}
	})
});

// @route           GET /fooditem/:id
// @desc            Get a FoodItem by id

router.get("/fooditem/:id", function(req, res) {
	FoodItem.findById(req.params.id, function(err, item) {
		if (err) {
			res.json({
				status: "FoodItem does not exist"
			});
		} else {
			res.json(item);
		}
	})
});

// @route           POST /fooditem/all
// @desc            Get all FoodItems

router.post("/fooditem/all", function(req, res) {
    FoodItem.find({email: req.body.email}, function(err, items) {
		if (err) {
			console.log(err);
		} else {
			res.json(items);
		}
	});
});

// @route 			POST /fooditem/add
// @desc 			Add a new FoodItem

router.post("/fooditem/add", function(req, res) {
    const newFoodItem = new FoodItem(req.body);

				FoodItem.findOne({ itemname: req.body.itemname }, function(err, item) {
					if (err) {
						res.json(err).status(400);
					} else if (item) {
						res.json({
							status: "FoodItem already exists"
						});
					} else {
						newFoodItem.save()
							.then(() => {
								res.status(200).json(newFoodItem);
							})
							.catch((err) => {
								res.json({ error: err });
							});
					}
				});
});	

// @route 			POST /fooditem/delete/:id
// @desc 			Delete a FoodItem

router.post("/fooditem/delete/:id", function(req, res) {
	FoodItem.findByIdAndDelete(req.params.id, function(err, item) {
		if (err) {
			res.json(err).status(400);
		} else if (!item) {
			res.json({
				status: "FoodItem does not exist"
			});
		} else {
			res.status(200).json(item);
		}
	});
});

// @route 			POST /fooditem/update/:id
// @desc 			Update a FoodItem

router.post("/fooditem/update/:id", function(req, res) {

	const foodItem = {
		addon: req.body.addon,
		count: req.body.count,
		email: req.body.email,
		itemname: req.body.itemname,
		price: req.body.price,
		rating: req.body.rating,
		tags: req.body.tags,
		vnv: req.body.vnv,
		vendor: req.body.vendor,
		shop: req.body.shop
	};


	FoodItem.findByIdAndUpdate(req.params.id,{$set: foodItem}, function(err, item) {
		if (err) {
			res.json(err).status(400);
		} else if (!item) {
			res.json({
				status: "FoodItem does not exist"
			});
		} else {
			item.save()
				.then(() => {
					res.status(200).json("FoodItem updated successfully");
				})
				.catch((err) => {
					res.json({ error: err });
				});
		}
	});
});










module.exports = router;