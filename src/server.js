import express from 'express'
import morgan from 'morgan';
import cookieParser from 'cookie-parser'
import cors from 'cors'

import authRoutes from './routes/auth.routes.js'


//INICIALIZACIONES
const app = express();

//CONFIGURACIONES

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

app.use("/api",authRoutes);

app.set('port', process.env.PORT || 3000);

export default app;