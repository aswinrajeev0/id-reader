import fetch from "node-fetch";
import sharp from "sharp";

export async function greyscaleImage(imageUrl: string): Promise<Buffer> {
    const response = await fetch(imageUrl);

    if (!response.ok) {
        throw new Error(`Failed to fetch image from URL: ${imageUrl}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    const imageBuffer = Buffer.from(arrayBuffer);

    return await sharp(imageBuffer).greyscale().toBuffer();
}