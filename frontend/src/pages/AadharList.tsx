import { useEffect, useState } from "react";
import { ChevronLeft, User } from "lucide-react"
import { toast } from "sonner"
import { AadhaarCard } from "@/components/Aadhar-card"
import { DeleteDialog } from "@/components/DeleteDialog";
import type { AadharData } from "@/types/aadhar-data.type";
import { deleteData, fetchAadharList } from "@/services/get-aadhar-list";
import { SkeletonGrid } from "@/components/SkeletonCard";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function AadhaarDisplayPage() {
    const [aadhaarData, setAadhaarData] = useState<AadharData[]>([])
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [cardToDelete, setCardToDelete] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    const handleDeleteClick = (id: string) => {
        setCardToDelete(id)
        setDeleteDialogOpen(true)
    }

    const confirmDelete = async (id: string) => {
        try {
            const response = await deleteData(id)
            setAadhaarData(prevData => prevData.filter(item => item._id !== id))
            setDeleteDialogOpen(false)
            setCardToDelete(null)
            toast(response.message || "Error deleting data.")
        } catch (error: any) {
            console.error(error)
            toast(error.message)
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true)
                const response = await fetchAadharList();
                setAadhaarData((response?.aadharData || []) as AadharData[])
            } catch (error) {
                console.error("Error fetching Aadhaar data:", error)
                toast("Error loading data. Please try again.")
            } finally {
                setIsLoading(false)
            }
        }

        fetchData();

    }, [])

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <Button variant={"link"} onClick={() => navigate(-1)}><ChevronLeft />Go back</Button>
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Aadhaar Data Records</h1>
                    <p className="text-gray-600">
                        Displaying {aadhaarData.length} saved Aadhaar record{aadhaarData.length !== 1 ? "s" : ""}
                    </p>
                </div>

                {isLoading ? (
                    <SkeletonGrid count={6} />
                ) : aadhaarData.length === 0 ? (
                    <div className="text-center py-12">
                        <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No Aadhaar data found</h3>
                        <p className="text-gray-500">There are no saved Aadhaar records to display.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {aadhaarData.map((data, index) => (
                            <AadhaarCard key={data._id || index} data={data} onDelete={handleDeleteClick} />
                        ))}
                    </div>
                )}
            </div>

            {/* Delete Confirmation Dialog */}
            <DeleteDialog
                confirmDelete={confirmDelete}
                deleteDialogOpen={deleteDialogOpen}
                setCardToDelete={setCardToDelete}
                setDeleteDialogOpen={setDeleteDialogOpen}
                cardToDelete={cardToDelete as string}
            />
        </div>
    )
}
