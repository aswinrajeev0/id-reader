import { FileImage, Upload } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import type React from "react";
import { uploadImage } from "@/services/image-upload";
import { toast } from "sonner";

const validateImageFile = (file: File) => {
    const allowedTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
    return allowedTypes.includes(file.type);
};

interface UploadAreaProps {
    side: "front" | "back";
    image: string | null;
    setFrontImage: React.Dispatch<React.SetStateAction<string | null>>;
    setBackImage: React.Dispatch<React.SetStateAction<string | null>>;
}

const UploadArea: React.FC<UploadAreaProps> = ({ side, image, setFrontImage, setBackImage }) => {
    const handleImageUpload = async (file: File, side: "front" | "back") => {
        if (!validateImageFile(file)) {
            toast.error("Invalid file type. Only PNG, JPG, JPEG, or WEBP images are allowed.");
            return;
        }
        const imageUrl = await uploadImage(file)

        if (side === "front") {
            setFrontImage(imageUrl)
        } else {
            setBackImage(imageUrl)
        }
    }

    const handleDrop = (e: React.DragEvent<HTMLDivElement>, side: "front" | "back") => {
        e.preventDefault()
        const files = e.dataTransfer.files
        if (files.length > 0) {
            handleImageUpload(files[0], side)
        }
    }

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>, side: "front" | "back") => {
        const files = e.target.files
        if (files && files.length > 0) {
            handleImageUpload(files[0], side)
        }
    }

    return (
        <Card className="relative">
            <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                    <FileImage className="h-5 w-5" />
                    {side === "front" ? "Front Side" : "Back Side"}
                </CardTitle>
                <CardDescription>Upload the {side} side of your Aadhaar card</CardDescription>
            </CardHeader>
            <CardContent>
                {image ? (
                    <div className="relative">
                        <img
                            src={image}
                            alt={`Aadhaar ${side} side`}
                            className="w-full h-48 object-cover rounded-lg border-2 border-dashed border-gray-300"
                        />
                        <Button
                            variant="outline"
                            size="sm"
                            className="absolute top-2 right-2"
                            onClick={() => (side === "front" ? setFrontImage(null) : setBackImage(null))}
                        >
                            Remove
                        </Button>
                    </div>
                ) : (
                    <div
                        className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors cursor-pointer"
                        onDrop={(e) => handleDrop(e, side)}
                        onDragOver={(e) => e.preventDefault()}
                        onClick={() => document.getElementById(`file-${side}`)?.click()}
                    >
                        <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                        <p className="text-sm text-gray-600 mb-2">Click to upload or drag and drop</p>
                        <p className="text-xs text-gray-500">PNG, JPG, JPEG up to 10MB</p>
                        <input
                            id={`file-${side}`}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleFileSelect(e, side)}
                        />
                    </div>
                )}
            </CardContent>
        </Card>
    )
}

export default UploadArea