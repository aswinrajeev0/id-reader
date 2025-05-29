import { z } from "zod";

export const AadharDataSchema = z.object({
    name: z.string().min(1, "Name is required"),
    fatherName: z.string().min(1, "Father's name is required"),
    aadharNumber: z.string().regex(/^\d{4} \d{4} \d{4}$/, "Invalid Aadhaar number"),
    dob: z.string().regex(/^\d{2}\/\d{2}\/\d{4}$/, "Invalid date of birth format (dd/mm/yyyy)"),
    gender: z.enum(["Male", "Female", "Others"]),
    address: z.string().min(1, "Address is required")
});

export type AadharData = z.infer<typeof AadharDataSchema>;
