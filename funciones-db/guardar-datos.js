'use strict'

const AWS = require('aws-sdk');
const api = require('../utils/api-response')
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
            let response = await api.construirRespuestaGeneral(error_db.statusCode,{
                error: error_db,
                message: "Error al guardar el producto"
            });
            callback(null, response);
            return;        
        }
        let response = await api.construirRespuestaGeneral(200, {mensaje:"Se guardo con exito."});
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