import fs from 'fs';
fs.writeFile(process.env.GOOGLE_SERVICE_KEY_PATH, process.env.GOOGLE_SERVICE_KEY, (err) => {});
