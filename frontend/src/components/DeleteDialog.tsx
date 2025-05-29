import type React from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader } from "./ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Button } from "./ui/button";

interface DeleteDialogProps {
    deleteDialogOpen: boolean;
    setDeleteDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
    confirmDelete: (id: string) => void;
    setCardToDelete: React.Dispatch<React.SetStateAction<string | null>>;
    cardToDelete: string
}

export const DeleteDialog: React.FC<DeleteDialogProps> = ({confirmDelete, deleteDialogOpen, setDeleteDialogOpen, setCardToDelete, cardToDelete}) => {

    const cancelDelete = () => {
        setDeleteDialogOpen(false)
        setCardToDelete(null)
    }

    return (
        <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-red-600">Confirm Deletion</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete this Aadhaar record? This action cannot be undone.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex space-x-2 sm:justify-end">
                    <Button variant="outline" onClick={cancelDelete}>
                        Cancel
                    </Button>
                    <Button variant="destructive" onClick={() => confirmDelete(cardToDelete)}>
                        Delete Record
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}