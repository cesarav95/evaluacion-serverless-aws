'use strict'

const AWS = require('aws-sdk')
const api = require('../utils/api-response')

const dynamoDB = new AWS.DynamoDB.DocumentClient()

module.exports.recuperar_productos =  (event, context, callback)=>{    

    try {

        const parametros = {
            TableName : 'producto',
        }
        dynamoDB.scan(parametros, (err, data)=>{
            if(err){
                let response = api.construirRespuestaGeneral(err.statusCode || 501, err)
                callback(null,response);
                return;
            }
            let res = api.construirRespuestaGeneral(201, data.Items);
            callback(null, res);
            return;
        });  

    } catch (error) {
        callback(error,null);
    }
    
}