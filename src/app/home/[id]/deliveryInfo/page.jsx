"use client"

import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import Script from "next/script"
import Razorpay from "razorpay"

export default function deliveryInfo(){
    const params = useParams()
    const id = params.id
    const [product, setProduct] = useState({
        price: ""
    })
    const [deliveryInfo, setDeliveryInfo] = useState({
        fullName: "",
        phone: "",
        address: ""
    })
    const [options, setOptions] = useState(null)

    useEffect(() => {
        if(!id){
            console.log("Product ID is missing")
            return;
        }

        const fetchProduct = async () => {
            try {
                const response = await fetch(`/api/products/${id}`)
                const data = await response.json()
                console.log(data)
                setProduct(data)
            } catch (error) {
                console.log("Error while fetching Price. ", error)
            }
        }
        
        fetchProduct()
    }, [params])

    const onSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await fetch(`/api/products/${id}/deliveryInfo`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({product, deliveryInfo})
            })

            const data = await res.json()
            console.log(data)
            if(!res.ok){
                throw new Error("Delivery Info Not Added")
            }
            console.log("res.options is: ", data.options)
            setOptions(data.options)
            console.log("OPTIONS is: ", options)

            const rzp = new window.Razorpay(data.options);
            rzp.open();

            

        } catch (error) {
            console.log(error)
            throw new Error("Error while adding Delivery Info")
        }

        // const order = await response.json();
        // try {
        //     // Open Razorpay Checkout
        //     console.log("options is: ", options)
        //     const rzp = new Razorpay(options);
        //     rzp.open();
        // } catch (error) {
        //    console.log("Error in Razorpay", error) 
        // }
      

    }

    return (
        <div>
            <Script
                src="https://checkout.razorpay.com/v1/checkout.js"
                strategy="lazyOnload"
            />
            <h1>Delivery Info</h1>
            <div>
                <input 
                    type="text"
                    value={setDeliveryInfo.fullName}
                    onChange = {(e) => setDeliveryInfo({...deliveryInfo, fullName: e.target.value})}
                    placeholder = "Name"
                />

                <input 
                    type="number"
                    value={setDeliveryInfo.phone}
                    onChange = {(e) => setDeliveryInfo({...deliveryInfo, phone: e.target.value})}
                    placeholder = "Phone No."
                />

                <input 
                    type="text"
                    value={setDeliveryInfo.address}
                    onChange = {(e) => setDeliveryInfo({...deliveryInfo, address: e.target.value})}
                    placeholder = "Address"
                />

                <button onClick = {onSubmit}>
                    PAY Rs.{product.price}
                </button>
    
            </div>
        </div>
    )
}