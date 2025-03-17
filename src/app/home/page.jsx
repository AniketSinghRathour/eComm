"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [products, setProducts] = useState([]);
  const router = useRouter()

  useEffect(() => {
    console.log("Fetching products...");
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products", {
          method: "GET",
          headers: { "Content-Type": "application/json" }
        })
        const data = await response.json()
        setProducts(data.products)
        console.log("Fetched Products:", data.products)
      } 
      catch (error) {
        console.error("Error fetching products:", error)
      }
    };

    fetchProducts();
  }, []);

  const checkProduct = (product_id) => {
    console.log("product_id is:", product_id)
    // console.log("this is: ", this)
    // console.log("", e.target.product_id)
    
    router.push(`/home/${product_id}`)
  }


  return (
    <div>
      <h1 className="text-6xl text-center">Home / All Products</h1>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div 
              key = {product._id}
              onClick = {() => { checkProduct(product._id) }} 
              className="bg-white shadow-md rounded-lg overflow-hidden"
            >
              
              <div className="relative w-full h-60">
                <Image
                  src={product.imageUrl}
                  alt={product.title}
                  fill
                  className="object-cover object-center rounded-t-lg"
                />
              </div>

              {/* Title & Price */}
              <div className="p-4 text-center">
                <h2 className="text-lg font-semibold">{product.title}</h2>
                <p className="text-gray-600 text-xl font-bold">Rs.{product.price}</p>
              </div>
            </div>
          ))} 
        </div>
      </div>
    </div>
  );
}
