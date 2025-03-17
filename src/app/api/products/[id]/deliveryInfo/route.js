import { NextResponse } from "next/server";
import { connectDB } from "../../../../../../lib/db";
import Order from "../../../../../../models/Order";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})

export async function POST(request){
    try {
        await connectDB()

        const body = await request.json()
        // console.log("BODY is: ", body)

        // create razorpay order
        const order = await razorpay.orders.create({
            amount: body.product.price * 100,
            currency: "INR",
            receipt: `recept-${Date.now()}`,
            notes: {
                productId: body.product._id.toString(),
            }
        })

        const newOrder = await Order.create({
            productId: body.product._id,
            deliveryInfo: body.deliveryInfo,
            razorpayOrderId: order.id,
            amount: body.product.price,
            status: "pending"          
        })

        //
        const options = {
                key_id: process.env.RAZORPAY_KEY_ID, // Replace with your Razorpay key_id
                amount: body.product.price * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                currency: 'INR',
                name: 'e-Comm',
                description: 'Test Transaction',
                order_id: order.id, // This is the order_id created in the backend
                callback_url: 'https://e-comm-olive.vercel.app/home', // Your success URL
                prefill: {
                  name: 'Aniket',
                  email: 'aniket@example.com',
                  contact: '9027164359'
                },
                theme: {
                  color: '000000'
                },
              };
        
        return NextResponse.json({
            orderId: order.id,
            amount: order.amount,
            currency: order.currency,
            dbOrderId: newOrder._id,
            options
        })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: "Something went wrong" }, { status: 500})
    }
}
