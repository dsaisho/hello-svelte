import fs from 'fs';
import path from 'path';
import { dev } from '$app/environment';
import { uploadToLocal,uploadImage } from '$lib/server/MediaApi';

export const POST = async ({ request }) => {
  
  const formData = await request.formData();
  const file = formData.get('image');

  let filePath = '';

  if (file && file instanceof File) {
  //  const url =  await uploadImageByBuffer(file);
  //   return new Response(JSON.stringify({
  //     "success": 1,
  //     "file": {
  //       "url": url,
  //       "width": 200
  //     }}));

    const uploadDir = dev ? 'static/uploads' : '/app/uploads';
    const localFilePath = await uploadToLocal(uploadDir,file);
    filePath = uploadImage(localFilePath)
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
