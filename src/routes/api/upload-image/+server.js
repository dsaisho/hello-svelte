import fs from 'fs';
import path from 'path';
import { dev } from '$app/environment';
import { uploadImageByBuffer,uploadImage } from '$lib/server/MediaApi';

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
    const uploadPath = path.join(uploadDir, file.name);

    if (!fs.existsSync(uploadDir)) {
      console.log("MAKING DIR")
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    console.log("DOING UPLOAD", uploadPath)
    const fileStream = fs.createWriteStream(uploadPath);
    fileStream.write(Buffer.from(await file.arrayBuffer()));
    fileStream.end();
    filePath = path.join('/uploads', file.name);
    console.log('isdev',dev)
    const url = uploadImage(filePath)
    console.log('url',url)
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
