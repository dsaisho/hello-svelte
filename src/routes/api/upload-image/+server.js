import { dev } from '$app/environment';
import { uploadToLocal,uploadImage } from '$lib/server/MediaApi';

export const POST = async ({ request }) => {
  
  const formData = await request.formData();
  const file = formData.get('image');

  let filePath = '';

  if (file && file instanceof File) {
    const UPLOAD_DIR = 'uploads';
    const uploadDir = dev ? `./static/${UPLOAD_DIR}/` : `/app/${UPLOAD_DIR}`;
    const localFilePath = await uploadToLocal(uploadDir,file);
    filePath = await uploadImage(localFilePath, file.name)
    // Upload directly to google cloud:
    // filepath =  await uploadImageByBuffer(file);
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
