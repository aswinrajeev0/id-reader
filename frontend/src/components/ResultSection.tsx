import type React from "react";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Calendar, Hash, MapPin, User, Edit2, Save, X } from "lucide-react";
import { Separator } from "@radix-ui/react-separator";
import type { AadharData } from "../types/aadhar-data.type";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { saveData } from "@/services/save-data";
import { toast } from "sonner";
import { formatToISO } from "@/utils/formatToIso";

interface ResultSectionProps {
    extractedData: AadharData;
    onDataUpdate?: (updatedData: AadharData) => void;
}

export const ResultSection: React.FC<ResultSectionProps> = ({ extractedData, onDataUpdate }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedData, setEditedData] = useState<AadharData>(extractedData);
    const [isSaving, setIsSaving] = useState(false);

    const handleEdit = () => {
        setIsEditing(true);
        setEditedData(extractedData);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setEditedData(extractedData);
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            const response = await saveData(editedData)

            onDataUpdate?.(editedData);

            setIsEditing(false);
            toast(response.message)
        } catch (error: any) {
            console.error('Error saving data:', error);
            toast(error?.message)
        } finally {
            setIsSaving(false);
        }
    };

    const handleInputChange = (field: keyof AadharData, value: string) => {
        setEditedData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const displayData = isEditing ? editedData : extractedData;

    return (
        <Card className="max-w-4xl mx-auto">
            <CardHeader>
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle className="text-2xl flex items-center gap-2">
                            <User className="h-6 w-6" />
                            Extracted Information
                        </CardTitle>
                        <CardDescription>Information extracted from your Aadhaar card</CardDescription>
                    </div>
                    <div className="flex gap-2">
                        {!isEditing ? (
                            <Button onClick={handleEdit} variant="outline" size="sm">
                                <Edit2 className="h-4 w-4 mr-2" />
                                Edit
                            </Button>
                        ) : (
                            <div className="flex gap-2">
                                <Button
                                    onClick={handleSave}
                                    size="sm"
                                    disabled={isSaving}
                                    className="bg-green-600 hover:bg-green-700"
                                >
                                    {isSaving ? (
                                        <>
                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                            Saving...
                                        </>
                                    ) : (
                                        <>
                                            <Save className="h-4 w-4 mr-2" />
                                            Save
                                        </>
                                    )}
                                </Button>
                                <Button onClick={handleCancel} variant="outline" size="sm">
                                    <X className="h-4 w-4 mr-2" />
                                    Cancel
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Personal Information */}
                <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <User className="h-5 w-5" />
                        Personal Details
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-500">Full Name</label>
                            {isEditing ? (
                                <Input
                                    value={displayData.name || ""}
                                    onChange={(e) => handleInputChange('name', e.target.value)}
                                    className="text-lg font-medium"
                                />
                            ) : (
                                <p className="text-lg font-medium">{displayData.name}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-500">Gender</label>
                            {isEditing ? (
                                <Select
                                    value={displayData.gender || ""}
                                    onValueChange={(value) => handleInputChange('gender', value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Male">Male</SelectItem>
                                        <SelectItem value="Female">Female</SelectItem>
                                        <SelectItem value="Other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                            ) : (
                                <Badge variant="secondary">{displayData.gender}</Badge>
                            )}
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-500">Date of Birth</label>
                            {isEditing ? (
                                <Input
                                    type="date"
                                    value={displayData.dob ? formatToISO(displayData.dob) : ""}
                                    onChange={(e) => handleInputChange('dob', e.target.value)}
                                />
                            ) : (
                                <p className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4" />
                                    {displayData.dob}
                                </p>
                            )}
                        </div>
                        {displayData.fatherName && (
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-500">Father's Name</label>
                                {isEditing ? (
                                    <Input
                                        value={displayData.fatherName}
                                        onChange={(e) => handleInputChange('fatherName', e.target.value)}
                                    />
                                ) : (
                                    <p>{displayData.fatherName}</p>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                <Separator />

                {/* Aadhaar Details */}
                <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <Hash className="h-5 w-5" />
                        Aadhaar Details
                    </h3>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-500">Aadhaar Number</label>
                        {isEditing ? (
                            <Input
                                value={displayData.aadharNumber || ""}
                                onChange={(e) => handleInputChange('aadharNumber', e.target.value)}
                                className="text-xl font-mono font-bold text-blue-600"
                                maxLength={12}
                                pattern="[0-9]{12}"
                            />
                        ) : (
                            <p className="text-xl font-mono font-bold text-blue-600">{displayData.aadharNumber}</p>
                        )}
                    </div>
                </div>

                <Separator />

                {/* Address */}
                <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <MapPin className="h-5 w-5" />
                        Address
                    </h3>
                    {isEditing ? (
                        <Textarea
                            value={displayData.address || ""}
                            onChange={(e) => handleInputChange('address', e.target.value)}
                            className="text-gray-700 leading-relaxed min-h-[100px]"
                            placeholder="Enter full address..."
                        />
                    ) : (
                        <p className="text-gray-700 leading-relaxed">{displayData.address}</p>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};