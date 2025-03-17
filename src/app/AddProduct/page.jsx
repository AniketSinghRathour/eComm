"use client"

import { useState } from "react"
import FileUpload from "../components/FileUpload"

export default function addProduct(){
    const [product, setProduct] = useState({
        imageUrl: "",
        title: "",
        price: "",
        availableStock: 0
    })

    const handleUploadSuccess = (response) => {
        setProduct({imageUrl: response.url})
        
        // console.log("Uploaded and FIle URL is: ", response.url)
        // console.log("imageUrl is: ", setProduct.imageUrl)
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        try {
          const res = await fetch("/api/admin", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(product)
          })

          console.log(res.json())
            if(!res.ok){
                throw new Error("Product Not Added")
            }

        } catch (error) {
            console.log(error)
            throw new Error("Error while Adding Product")
        }
    }

    return (
        <div>
            <input 
                type="text"
                value={setProduct.title}
                onChange = {(e) => setProduct({...product, title: e.target.value})}
                placeholder = "Title"
            />

            <FileUpload onSuccess={handleUploadSuccess} />

            <input 
                type="number"
                min={0}
                value={setProduct.price}
                onChange = {(e) => setProduct({...product, price: e.target.value})}
                placeholder = "Price"
            />

            <input 
                type="number"
                min={0}
                value={setProduct.availableStock}
                onChange = {(e) => setProduct({...product, availableStock: e.target.value})}
                placeholder = "Available Stock"
            />

            <button onClick = {onSubmit}>
                Add Product
            </button>
        </div>
    )
}