import { Request, Response } from "express";
import { ERROR_MESSAGES, HTTP_STATUS, SUCCESS_MESSAGES } from "../shared/constants";
import { extractTextFromImages } from "../helpers/extractText";
import { extractAadhaarInfo } from "../helpers/formatAadharData";
import { greyscaleImage } from "../helpers/greyScaleImage";
import { AadharData } from "../shared/types";
import { AadharDataSchema } from "../shared/validation";
import { AadharModel } from "../models/aadharModel";

export async function ocrController(req: Request, res: Response): Promise<void> {
    try {
        const frontImage = req.body.frontImage;
        const backImage = req.body.backImage;
        if (!frontImage || !backImage) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                success: false,
                message: ERROR_MESSAGES.NO_FILE_UPLOADED
            })
            return;
        }

        const frontBuffer = await greyscaleImage(frontImage);
        const backBuffer = await greyscaleImage(backImage);

        const { frontText, backText } = await extractTextFromImages(frontBuffer, backBuffer);
        const parsedData = extractAadhaarInfo(frontText, backText);

        res.status(HTTP_STATUS.OK).json({
            success: true,
            message: SUCCESS_MESSAGES.DATA_PARSED,
            parsedData
        })
    } catch (error) {
        console.error(error)
        res.status(HTTP_STATUS.OCR_FAILED).json({
            success: false,
            message: ERROR_MESSAGES.OCR_FAILED
        })
    }
}

export async function saveData(req: Request, res: Response): Promise<void> {
    try {
        const { data } = req.body;
        const parsedResult = AadharDataSchema.safeParse(data);

        if (!parsedResult.success) {
            res.status(400).json({
                success: false,
                message: ERROR_MESSAGES.MISSING_FIELDS
            });
            return;
        }

        const aadharData: AadharData = parsedResult.data;

        await AadharModel.create(aadharData)

        res.status(HTTP_STATUS.CREATED).json({
            success: true,
            message: SUCCESS_MESSAGES.DATA_SAVED
        })

    } catch (error) {
        console.error(error)
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR
        })
    }
}

export async function getAadharList(req: Request, res: Response): Promise<void> {
    try {
        const aadharData = await AadharModel.find();
        if (!aadharData || aadharData.length === 0) {
            res.status(HTTP_STATUS.NOT_FOUND).json({
                success: false,
                message: ERROR_MESSAGES.NOT_FOUND
            })
            return;
        }

        res.status(HTTP_STATUS.OK).json({
            success: true,
            aadharData
        })
    } catch (error) {
        console.error(error)
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR
        })
    }
}

export async function deleteData(req: Request, res: Response): Promise<void> {
    try {
        const id = req.query.id as string;
        if(!id){
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                success: false,
                message: ERROR_MESSAGES.ID_NOT_PROVIDED
            })
            return;
        }

        const aadhar = await AadharModel.findByIdAndDelete(id);
        if(!aadhar){
            res.status(HTTP_STATUS.NOT_FOUND).json({
                success: false,
                message: ERROR_MESSAGES.NOT_FOUND
            })
            return;
        }

        res.status(HTTP_STATUS.OK).json({
            success: true,
            message: SUCCESS_MESSAGES.DOCUMENT_DELETED
        })
    } catch (error) {
        console.error(error)
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR
        })
    }
}