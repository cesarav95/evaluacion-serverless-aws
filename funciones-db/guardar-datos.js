'use strict'

const AWS = require('aws-sdk');
const { v4: uuidv4 }  = require('uuid');

const dynamoDB = new AWS.DynamoDB.DocumentClient();


const guardar_producto =  async (event, context, callback)=>{    

    try {
        //console.log(event.body);
        const data = JSON.parse(event.body);
        const current_date = new Date().toISOString();
        const parametros = {
            TableName : 'producto',
            Item : {
                id: uuidv4(),
                nombre: data.nombre,
                descripcion: data.descripcion,
                marca: data.marca,
                precio: data.precio,
                fecha_registro: current_date,
                proveedor: data.proveedor
            }
        }
        let error_db;
        const res_dynamodb = await dynamoDB.put(parametros).promise().catch(err=> {console.error(err);error_db = err});

        if (!res_dynamodb) {
            callback(null, {
                statusCode: error_db.statusCode ,               
                body: JSON.stringify({
                    error: error_db,
                    message: "Error al guardar el producto"
                }),
            });
            return;        
        }
        const response = {
            statusCode: 200,
            body: JSON.stringify({mensaje:"Se guarda con exito."}),
        };
        callback(null, response);
        return;        

    } catch (error) {
        callback(error,null);
        return;
    }
    
}
module.exports={
    guardar_producto
};