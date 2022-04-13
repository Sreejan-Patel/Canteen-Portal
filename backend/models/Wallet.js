const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const WalletSchema = new Schema({
    userID: {
        type: String,
        required: true,
    },
    balance: {
        type: Number,
        required: true,
        default: 0
    }
});

module.exports = Wallet = mongoose.model("Wallet", WalletSchema);