'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';

export default function Product() {
    const params = useParams()
    // const {params} = await params
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const id = params.id
    console.log("ID is:", id)

    if (!id) {
      setError('Product ID is missing.')
      setLoading(false)
      return;
    }

    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${id}`)
        // if (!response.ok) {
        //   throw new Error('Product not found.');
        // }
        console.log("Response is:", response)
        const data = await response.json()
        console.log("DATA is: ", data)
        setProduct(data)
      } catch (err) {
        setError(err.message)
      } 
      finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [params]);

  // if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>

  // Ensure product is not null before rendering
  if (!product) return null;

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        {/* Image Section */}
        <div className="w-full md:w-1/2">
          <Image
            src={product.imageUrl}
            alt={product.title}
            width={500}
            height={500}
            className="rounded-lg w-full object-cover"
          />
        </div>

        {/* Text Section */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h2 className="text-4xl font-bold">{product.title}</h2>
          <p className="text-lg text-gray-600 mt-2">${product.price}</p>
        </div>
      </div>
    </div>
  );
}
