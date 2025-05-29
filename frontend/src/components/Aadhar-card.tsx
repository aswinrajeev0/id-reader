import { Calendar, Hash, MapPin, Trash2, User, UserCheck, Users } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import type { AadharData } from "@/types/aadhar-data.type"

interface AadhaarCardProps {
    data: AadharData
    onDelete: (id: string) => void
}

export function AadhaarCard({ data, onDelete }: AadhaarCardProps) {
    const formatDate = (dateString: string | null) => {
        if (!dateString) return "Not provided"
        const date = new Date(dateString)
        return date.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "long",
            year: "numeric",
        })
    }

    return (
        <Card className="w-full max-w-md hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                    <User className="h-5 w-5 text-blue-600" />
                    {data.name || "Name not provided"}
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid gap-3">
                    <div className="flex items-center gap-2">
                        <Hash className="h-4 w-4 text-gray-500" />
                        <div>
                            <p className="text-sm font-medium text-gray-700">Aadhaar Number</p>
                            <p className="text-sm text-gray-900 font-mono">{data.aadharNumber}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <div>
                            <p className="text-sm font-medium text-gray-700">Date of Birth</p>
                            <p className="text-sm text-gray-900">{formatDate(data.dob)}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <UserCheck className="h-4 w-4 text-gray-500" />
                        <div>
                            <p className="text-sm font-medium text-gray-700">Gender</p>
                            <Badge variant={data.gender === "Male" ? "default" : data.gender === "Female" ? "secondary" : "outline"}>
                                {data.gender || "Not specified"}
                            </Badge>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-gray-500" />
                        <div>
                            <p className="text-sm font-medium text-gray-700">Father's Name</p>
                            <p className="text-sm text-gray-900">{data.fatherName || "Not provided"}</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 text-gray-500 mt-0.5" />
                        <div>
                            <p className="text-sm font-medium text-gray-700">Address</p>
                            <p className="text-sm text-gray-900 leading-relaxed">{data.address || "Address not provided"}</p>
                        </div>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="pt-2 pb-4">
                <Button variant="destructive" size="sm" className="ml-auto flex items-center gap-1" onClick={() => onDelete(data._id)}>
                    <Trash2 className="h-4 w-4" />
                    Delete
                </Button>
            </CardFooter>
        </Card>
    )
}