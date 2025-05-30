import * as yup from "yup";

export const aadharSchema = yup.object().shape({
    name: yup.string().required("Full name is required"),
    gender: yup.string().oneOf(["Male", "Female", "Other"]).required("Gender is required"),
    dob: yup
        .string()
        .required("Date of Birth is required")
        .matches(/^\d{4}-\d{2}-\d{2}$/, "DOB must be in format YYYY-MM-DD"),
    fatherName: yup.string().nullable(),
    aadharNumber: yup
        .string()
        .required("Aadhaar number is required"),
    // .matches(/^[0-9]{12}$/, "Aadhaar number must be exactly 12 digits"),
    address: yup.string().required("Address is required"),
});
