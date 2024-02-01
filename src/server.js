import express from 'express'
import morgan from 'morgan';
import cookieParser from 'cookie-parser'
import cors from 'cors'

import authRoutes from './routes/auth.routes.js'
import userRoutes from './routes/user.routes.js'
import fileUpload from 'express-fileupload';
//INICIALIZACIONES
const app = express();

//CONFIGURACIONES

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

app.use("/api",authRoutes);
app.use('/api', userRoutes)

app.set('port', process.env.PORT || 3000);

export default app;