import { NextResponse } from "next/server";
import crypto from "crypto"
import { connectDB } from "../../../../../lib/db";
import Order from "../../../../../models/Order";
// import { connectDB } from "@/lib/db";
// import Order from "@/models/Order";
// import nodemailer from "nodemailer";

export async function POST(req){
    try {
        const body = await req.text()
        console.log("webHOOK BODY: ", body)
        console.log("**********************************************", req.razorpay_signature)
        const signature = req.headers.get("x-razorpay-signature")

        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET)
            .update(body)
            .digest("hex");

        if(expectedSignature !== signature){
            return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
        }

        const event = JSON.parse(body)
        console.log("EVENT: ", event)
        await connectDB()

        if(event.event === "payment.captured"){
            const payment = event.payload.payment.entity;
            console.log("PAYMENT: ", payment)
            const order = await Order.findOneAndUpdate(
                { razorpayOrderId: payment.order_id },
                {
                    razorpayPaymentId: payment.id,
                    status: "completed",

                }
            ).populate(
                //[ { path: "productId", select: "name" },
                // { path: "userId", select: "email" } ]
            )

            // if(order){
            //     const transporter = nodemailer.createTransport({
            //         service: "sandbox.smtp.mailtrap.io",
            //         port: 2525,
            //         auth: {
            //             // add these to .env
            //             user: "1a6599637ee691",
            //             pass: "f7719d8fe0a473",
            //         }
            //     })

            //     await transporter.sendMail({
            //         from: "your@example.com",
            //         to: order.userId.email,
            //         subject: "Order Completed",
            //         text: `Your order ${order.productId.name} has been successfully placed`,
            //     })
            // }
        }

        return NextResponse.json({ message: "success" }, { status: 200 })

    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
    }
}