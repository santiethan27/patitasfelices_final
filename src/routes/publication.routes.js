import { Router } from 'express';
import fileUpload from 'express-fileupload';
import { postPublication } from './../controllers/publication.controller.js';

const router = Router();

const fileUp = fileUpload({
    useTempFiles: true,
    tempFileDir: './uploads/'
});

router.post('/upload-publication', fileUp, postPublication);

export default router;