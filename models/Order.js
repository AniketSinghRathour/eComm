import {Schema, model, models} from "mongoose";

const deliveryInfo = new Schema({
    fullName: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    }
})

const orderSchema = new Schema({
    productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    deliveryInfo: deliveryInfo,
    // amount: {
    //     type: Number,
    //     required: true
    // },
    deliveryStatus: {
        type: String,
        enum: [" ", "not delivered", "shipped", "delivered"],
        default: " "
    },
    razorpayOrderId: {
        type: String,
        required: true
    },
    razorpayPaymentId: {
        type: String,
        // required: true,
        // default: " "
    },
    amount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ["pending", "completed", "failed"],
        // default: "pending",
        // set: (v) => v.toUpperCase()
    },
}, {timestamps: true})

const Order = models?.Order || model("Order", orderSchema);

export default Order;