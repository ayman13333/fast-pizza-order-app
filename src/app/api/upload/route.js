//import formidable from 'formidable';
//import fs from 'fs';
//import { v4 as uuidv4 } from 'uuid';
import multer from 'multer';
import fs from 'fs';
import path from 'path';

// Set up Multer middleware
const upload = multer({
    dest: '../../../../public/', // Destination directory for uploaded files
  });
  

export const config = {
  api: {
    bodyParser: false,
  },
};
export async function POST(req,res) {
   // const file = req.body.file; // Assuming the file is sent as part of the request body
   const data =  await req.formData();
   const file=data.get('file');

   console.log(req.file);
   return;

//    upload.single('file')(req, res, async (err) => {
//     if (err instanceof multer.MulterError) {
//       // Multer error occurred
//       console.error('Multer error:', err);
//       return res.status(500).json({ error: 'Error uploading file' });
//     } else if (err) {
//       // Other error occurred
//       console.error('Other error:', err);
//       return res.status(500).json({ error: 'Error uploading file' });
//     }

//     // File upload successful
//     const fileName = req.file.filename;

//     // Example directory to save uploads
//     const uploadDir = path.join(process.cwd(), 'public');
//     if (!fs.existsSync(uploadDir)) {
//       fs.mkdirSync(uploadDir, { recursive: true });
//     }

//     // Move the uploaded file to the desired directory
//     fs.rename(req.file.path, path.join(uploadDir, fileName), (err) => {
//       if (err) {
//         console.error('Error moving file:', err);
//         return res.status(500).json({ error: 'Error moving file' });
//       }
//       console.log('File uploaded successfully!');
//       res.status(200).json({ success: true, message: 'File uploaded successfully', fileName });
//     });
//   });

    
}
