import multer from "multer";
import { multerSaveFilesOrg } from "multer-savefilesorg";
// The below is using the local upload approach. You will need to import it before the folder is upload
export const localUpload = multer({dest: 'uploads' });

export const remoteUpload = multer({
    storage: multerSaveFilesOrg({
        apiAccessToken: process.env.SAVEFILESORG_API_KEY,
        relativePath: '/ecommerce-api/*'
    })
})