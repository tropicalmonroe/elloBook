const mongoose = require("mongoose")

const ProductSchema  = new mongoose.Schema(
    {
        title: { type: String, required: true},
        author: { type: String, required: true },
        coverPhotoURL: { type: String, required: true },
        readingLevel: { type: String, required: true }
    },
    {
        timestamps: true
    }
)
module.exports = mongoose.model("Product", ProductSchema)