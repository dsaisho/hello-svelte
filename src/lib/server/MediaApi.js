import { Storage } from '@google-cloud/storage';
import path from 'path';
import fs from 'fs';

const tempMediaDir = './app/tempMediaDird';
const BUCKET_ID = 'hello-svelte'
const PUBLIC_BASE_URL = `https://storage.googleapis.com/${BUCKET_ID}`
const storage = new Storage({ projectId: 'svelte-js', keyFilename: 'google_servicekey.json' });
const bucket = storage.bucket(BUCKET_ID);

export const deleteAllMediaFiles = async () => {
    bucket.deleteFiles()
}

export async function uploadImage(_filePath) {
    await bucket.upload(_filePath, {
        gzip: true,
        metadata: {
            contentType: "image/jpeg"
        }
    })
    return _filePath
}

export async function uploadImageByBuffer(file) {
    const name = file.name.replace(/ /g, "_");
    const blob = bucket.file(name);

    return new Promise((resolve, reject) => {
        const blobStream = blob.createWriteStream({
            resumable: false,
            contentType: file.type // Use the file's MIME type
        });

        blobStream.on('error', (error) => {
            reject(`Unable to upload image, something went wrong: ${error.message}`);
        });

        blobStream.on('finish', () => {
            const publicUrl = `${PUBLIC_BASE_URL}/${blob.name}`;
            resolve(publicUrl);
        });

        file.arrayBuffer().then(arrayBuffer => {
            blobStream.end(Buffer.from(arrayBuffer));
        }).catch(error => {
            reject(`Error reading file: ${error.message}`);
        });
    });
}

function initLocalMediaDir() {
    const mediaDirExists = fs.existsSync(tempMediaDir)
    if (!mediaDirExists) {
        fs.mkdirSync(tempMediaDir);
    } else {
        deleteLocalMediaContents()
    }
}

function deleteLocalMediaContents() {
    const fileObjs = fs.readdirSync(tempMediaDir)
    for (const file of fileObjs) {
        fs.unlinkSync(path.join(tempMediaDir, file), err => {
            if (err) throw err;
        });
    }
}