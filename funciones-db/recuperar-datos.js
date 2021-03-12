'use strict'

const AWS = require('aws-sdk')

const dynamoDB = new AWS.DynamoDB.DocumentClient()

module.exports.recuperar_productos =  (event, context, callback)=>{    

    try {

        const parametros = {
            TableName : 'producto',
        }
        dynamoDB.scan(parametros, (err, data)=>{
            if(err){
                callback(null, {
                    statusCode:err.statusCode || 501,
                    body: JSON.stringify(err)
                });
                return;
            }
            const res = {
                statusCode : 201,
                body: JSON.stringify(data.Items)
            }
            callback(null, res);
            return;
        });  

    } catch (error) {
        callback(error,null);
    }
    
}