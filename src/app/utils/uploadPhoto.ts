import cloudinary from "../config/cloudinary"
import streamifier from "streamifier"
import { ICloudinaryResponse } from "../interface/file"
import config from "../config"

export const uploadBufferToCloudinary = (
  file: Express.Multer.File,
  subfolder: string = "categories",
): Promise<ICloudinaryResponse | undefined> => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: config.cloudinary_folder + "/" + subfolder,
        resource_type: "image",
      },
      (error, result) => {
        if (error) return reject(error)
        resolve(result)
      },
    )

    streamifier.createReadStream(file.buffer).pipe(stream)
  })
}

export const uploadMultipleBuffersToCloudinary = (
  files: Express.Multer.File[],
  subfolder: string = "categories",
): Promise<(ICloudinaryResponse | undefined)[]> => {
  const uploadPromises = files.map((file) =>
    uploadBufferToCloudinary(file, subfolder),
  )
  return Promise.all(uploadPromises)
}
