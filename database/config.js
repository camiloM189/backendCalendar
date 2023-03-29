const mongoose = require('mongoose');


const dbConnection = async() => {
    
    try {

        await mongoose.connect(process.env.DB_CNN, {
            socketOptions: {
                socketTimeoutMS: 0,
                connectionTimeout: 300000
              }
        });
        console.log('DB online');

        
    } catch (error) {
        console.log(error);
        throw new Error('error al inicializar la base de datos')
    }


}
module.exports = {

    dbConnection

}