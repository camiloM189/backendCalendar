const express = require('express')
const { dbConnection } = require('./database/config');
const cors  = require('cors');
require('dotenv').config();

//Crear el servidor express
const app = express();


dbConnection();

app.use(cors())


app.use(express.static('public'));

//enviar peticiones a la base de datos
app.use(express.json());



//Rutas

app.use('/api/auth',require('./routes/auth'));
app.use('/api/events',require('./routes/events'));

app.get('*', (req,res) => {
    res.sendFile( __dirname + '/public/index.html')

})
//Escuchar preticiones
app.listen(process.env.PORT,() => {
    console.log(`servidor conrriendo en el puerto ${process.env.PORT}`);

});
