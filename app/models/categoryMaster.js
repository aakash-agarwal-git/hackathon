const mongoose = require("mongoose");

const categoryMasterSchema = new mongoose.Schema({
    categoryId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    subCategory: {
        type: Array,
    }
});

module.exports = mongoose.model("categoryMaster", categoryMasterSchema);
