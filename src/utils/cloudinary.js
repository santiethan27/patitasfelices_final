import {v2 as cloudinary} from 'cloudinary';
          
cloudinary.config({ 
  cloud_name: 'duvbxqzxx', 
  api_key: '896479486825397', 
  api_secret: '9MonU-R2lWu3bONuTSRDqy_9je4' 
});

export async function uploadImage(filePath){
    return await cloudinary.uploader.upload(filePath, {
        folder: 'media'
    })
}