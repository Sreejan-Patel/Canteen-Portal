var express = require("express");
var router = express.Router();

const Order = require("../models/Order");
const FoodItem = require("../models/FoodItem");

// @route          POST /orders/email/vendor
// @desc           Get all orders by email of vendor

router.post("/email/vendor", (req, res) => {
    Order.find({ emailVendor: req.body.email }, function(err, user) {
        if (err) {
            res.json(err).status(400);
        } else if (!user) {
            res.json({
                status: "Orders does not exist"
            });
        } else {
            res.status(200).json(user);
        }
    });
});

// @route          POST /orders/email/buyer
// @desc           Get all orders by email of vendor

router.post("/email/buyer", (req, res) => {
    Order.find({ emailBuyer: req.body.email }, function(err, user) {
        if (err) {
            res.json(err).status(400);
        } else if (!user) {
            res.json({
                status: "Orders does not exist"
            });
        } else {
            res.status(200).json(user);
        }
    });
});


// @route          POST /orders/update/status/:id   
// @desc           Update order status

router.post("/update/status/:id", (req, res) => {
    Order.findById(req.params.id, function(err, order) {
        if (err) {
            res.json(err).status(400);
        } else if (!order) {
            res.json({
                status: "Order does not exist"
            });
        } else {
            order.status = req.body.status;
            order.save()
                .then(() => {
                    res.status(200).json(order);
                })
                .catch((err) => {
                    res.json({ error: err });
                });
        }
    });
});

// @route          POST /orders/add
// @desc           Add order
router.post("/add", (req, res) => {
    const order = new Order({
        addon: req.body.addon,
        emailBuyer: req.body.emailBuyer,
        emailVendor: req.body.emailVendor,
        itemname: req.body.itemname,
        placedtime: req.body.placedtime,
        price: req.body.price,
        quantity: req.body.quantity,
        rating: req.body.rating,
        shop: req.body.shop,
        status: req.body.status,
        tags: req.body.tags,
        vendor: req.body.vendor,
        vnv: req.body.vnv
    });


    order.save()
        .then(() => {
            res.status(200).json(order);
        })
        .catch((err) => {
            res.json({ error: err });
        });
    })



// @route          POST /orders/update/rating/:id
// @desc           Update order rating

router.post("/update/rating/:id", (req, res) => {
    Order.findById(req.params.id, function(err, order) {
        if (err) {
            res.json(err).status(400);
        } else if (!order) {
            res.json({
                status: "Order does not exist"
            });
        } else {
            order.rating = req.body.rating;
            order.save()
                .then(() => {
                    res.status(200).json(order);
                })
                .catch((err) => {
                    res.json({ error: err });
                });
        }
    });
});
















module.exports = router;