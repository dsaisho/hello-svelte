import { dev } from '$app/environment';
import { uploadToLocal,uploadImage } from '$lib/server/MediaApi';

export const POST = async ({ request }) => {
  
  const formData = await request.formData();
  const file = formData.get('image');

  let filePath = '';

  if (file && file instanceof File) {
  // upload directly to google cloud:
  //  const url =  await uploadImageByBuffer(file);
    const UPLOAD_DIR = '/app/uploads';
    const uploadDir = dev ? `static${UPLOAD_DIR}` : UPLOAD_DIR;
    const localFilePath = await uploadToLocal(uploadDir,file);
    filePath = await uploadImage(localFilePath, file.name)
  }
  return new Response(JSON.stringify({
    "success": 1,
    "file": {
      "url": filePath,
      "width": 200
    }
  }), {
    headers: {
      'Content-Type': 'application/json'
    }
  });
}
