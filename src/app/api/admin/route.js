import { NextResponse } from "next/server"
import { connectDB } from "../../../../lib/db"
import Product from "../../../../models/Product"

export async function POST(request){
    try {
        await connectDB()

        const body = await request.json()
        // body.price = Number(body.price)
        // body.availableStock = Number(body.availableStock)
        console.log("BODY: ", body)
        
        if( !body.imageUrl || !body.title || !body.price || !body.availableStock ){
            return NextResponse.json({ error: "All fields are required" }, { statsus: 400 })
        }

        const newProduct = await Product.create(body)

        return NextResponse.json({ newProduct }, { status: 201 })
    } 
    catch (error) {
        console.error(error)
        return NextResponse.json({ error: "Something went wrong" }, { status: 500})
    }
}