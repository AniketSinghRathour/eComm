import { NextResponse } from "next/server";
import { connectDB } from "../../../../lib/db";
import Product from "../../../../models/Product";

export async function GET(){
    try {
        await connectDB();
        const products = await Product.find({}).lean()

        if(!products || products.length === 0){
            return NextResponse.json({ error: "No Products found" }, { status: 404 })
        }

        return NextResponse.json({ products }, { status: 200 })
    } catch (error) {
        console.log(error)
        console.log(error)
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 }) 
    }
    // return NextResponse.json({ message: "All Products sent" }, { status: 200 })
}