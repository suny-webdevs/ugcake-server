import dotenv from "dotenv"
import path from "path"
import cloudinary from "./cloudinary"

dotenv.config({ path: path.join(process.cwd(), ".env") })

export default {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  node_env: process.env.NODE_ENV,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN,
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
  jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  cloud_api_key: process.env.CLOUDINARY_API_KEY!,
  cloud_api_secret: process.env.CLOUDINARY_API_SECRET!,
  cloudinary_folder: process.env.CLOUDINARY_UPLOAD_FOLDER!,
}
