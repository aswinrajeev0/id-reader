import { useState } from "react"
import UploadArea from "@/components/UploadArea"
import { getImageData } from "@/services/processOcr"
import type { AadharData } from "@/types/aadhar-data.type"
import { ResultSection } from "@/components/ResultSection"
import { OCRProcessButton } from "@/components/OCRProcessButton"
import { FeaturesSection } from "@/components/FeaturesSection"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import { Database } from "lucide-react"

export default function Home() {
    const [frontImage, setFrontImage] = useState<string | null>(null)
    const [backImage, setBackImage] = useState<string | null>(null)
    const [isProcessing, setIsProcessing] = useState(false)
    const [extractedData, setExtractedData] = useState<AadharData | null>(null)
    const navigate = useNavigate()

    const processOCR = async () => {
        setIsProcessing(true)

        const aadharData = await getImageData(frontImage, backImage)

        setExtractedData((aadharData?.parsedData || []) as AadharData)
        setIsProcessing(false)
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div className="text-center flex-1">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">Aadhaar Card OCR Scanner</h1>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Upload your Aadhaar card images and extract information automatically using advanced OCR technology
                        </p>
                    </div>
                    <div className="ml-8">
                        <Button
                            onClick={() => navigate("/aadhar-list")}
                            variant="outline"
                            className="flex items-center gap-2 bg-white hover:bg-gray-50 border-gray-300 text-gray-700 px-6 py-2"
                        >
                            <Database className="h-4 w-4" />
                            View Saved Data
                        </Button>
                    </div>
                </div>

                {/* Upload Section */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <UploadArea
                        side="front"
                        image={frontImage}
                        setBackImage={setBackImage}
                        setFrontImage={setFrontImage}
                    />
                    <UploadArea
                        side="back"
                        image={backImage}
                        setBackImage={setBackImage}
                        setFrontImage={setFrontImage}
                    />
                </div>

                {/* OCR Process Button */}
                {(frontImage && backImage) && (
                    <OCRProcessButton
                        isProcessing={isProcessing}
                        processOCR={processOCR}
                    />
                )}

                {/* Results Section */}
                {extractedData && (
                    <ResultSection extractedData={extractedData} />
                )}

                {/* Features Section */}
                <FeaturesSection />
            </div>
        </div>
    )
}
