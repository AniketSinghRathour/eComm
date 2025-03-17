"use client"
import { IKUpload } from "imagekitio-next"
import { useState } from "react"

export default function FileUpload({onSuccess}){
    const [uploading, setUploading] = useState(false)
    const [error, setError] = useState(null)

    const onError = (err) => {
        setError(err.message)
        setUploading(false)
    }

    const handleSuccess = (response) => {
        setUploading(false)
        setError(null)
        onSuccess(response)
    }

    const handleStartUpload = () => {
        setUploading(true)
        setError(null)
    }

    return (
        <div className="space-y-2">
            <IKUpload 
                fileName="product-image.png" 
                onError={onError} 
                onSuccess={handleSuccess}
                onUploadStart={handleStartUpload}
                validateFile={(file) => {
                    const validTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp"]
                    if(!validTypes.includes(file.type)){
                        setError("Invalid file type")
                    }

                    if(file.size > 25 * 1024 * 1024){
                        setError("File size too large")
                    }

                    return true
                }}
                useUniqueFileName={true} 
                folder = {"/images"}
            />

            {uploading && (
                <p className="text-sm text-gray-500">Uploading...</p>
            )}

            {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
    )
}