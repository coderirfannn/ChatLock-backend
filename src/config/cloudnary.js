import {v2 as cloudinary} from "cloudinary"
import { ENV } from "./env"


cloudinary.config({
    cloud_name:ENV.CLOUDNARY_CLOUD_NAME,
    api_key:ENV.CLOUDNARY_API_KEY,
    api_secret:ENV.CLOUDNARY_API_SECRET
})



export default cloudinary