var express = require("express");
var router = express.Router();

const Wallet = require("../models/Wallet");


router.post("/", (req, res) => {
    const user = {
        userID: req.body.email,
        balance: 0
    }
    Wallet.findOne({ userID: req.body.email }, (err, wallet) => {
        if (err) {
            console.log(err);
        } else {
            if (!wallet) {
                Wallet.create(user, (err, wallet) => {
                    if (err) {
                        console.log(err);
                    } else {
                        res.json(wallet);
                    }
                });
            } else {
                res.json(wallet);
            }
        }
    });
});




// @route   POST /wallet/balance
// @desc    Get wallet balance

router.post("/balance", (req, res) => {
    const user = {
        userID: req.body.email
    };
    Wallet.findOne(user, (err, wallet) => {
        if (err) {
        res.json({
            success: false,
            msg: "Failed to get wallet balance"
        });
        } else {
        res.json({
            success: true,
            msg: "Wallet balance fetched successfully",
            balance: wallet.balance
        });
        }
    });
});

// @route   POST /wallet/add
// @desc    Add money to wallet

router.post("/add", (req, res) => {
    const user = {
        userID: req.body.email,
        balance: req.body.balance
    };
    Wallet.findOneAndUpdate({userID: req.body.email}, {
        $inc: {
            balance: parseInt(req.body.balance)
        }
    }, {
        new: true
    }, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({
                error: err
            });
        } else {
            res.status(200).json({
                success: true,
                msg: "Money added successfully",
                balance: result.balance
            });
        }
    });
});

// @route   POST /wallet/deduct
// @desc    Deduct money from wallet

router.post("/deduct", (req, res) => {
    const user = {
        userID: req.body.email,
        balance: req.body.balance
    };
    Wallet.findOneAndUpdate({userID: req.body.email}, {
        $inc: {
            balance: -parseInt(req.body.balance)
        }
    }, {
        new: true
    }, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({
                error: err
            });
        } else {
            res.status(200).json({
                success: true,
                msg: "Money deducted successfully",
                balance: result.balance
            });
        }
    });
});





module.exports = router; 