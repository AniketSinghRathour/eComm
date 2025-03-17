import { NextResponse } from "next/server.js";
import { connectDB } from "../../../../../lib/db.js";
import Product from "../../../../../models/Product.js";

export async function GET(
    request,
    {params}
){
    try {
        // console.log("PARAMS is:", params.id)
        const {id} = await params
        console.log("ID is: ", {id})
        
        await connectDB()
        // const id = await request.json()
        console.log("ID is: ", id)
        const product = await Product.findById(id).lean()

        if(!product){
            return NextResponse.json({ error: "No product found" }, { status: 404 })
        }
        console.log(product)
        return NextResponse.json( product , { status: 200 })
    } catch (error) {
        console.error(error)
        return NextResponse.json(
            { error: "Failed to fetch product" },
            { status: 500 }
        )
    }
}