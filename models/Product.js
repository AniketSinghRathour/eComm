import {Schema, model, models} from "mongoose";

const productSchema = new Schema({
    imageUrl: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    availableStock: {
        type: Number,
        required: true,
        default: 0
    }
}, {timestamps: true})

const Product = models?.Product || model("Product", productSchema)

export default Product