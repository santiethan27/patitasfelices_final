import app from './server.js';
import { connectDB } from './database.js';

//conexion base de datos
connectDB();

//PONIENDO A ESCUCHAR EL PUERTO
app.listen(app.get('port'), () => {

    console.log('>>> Servidor(Ok):', app.get('port'));

});