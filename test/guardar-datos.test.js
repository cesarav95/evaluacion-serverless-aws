const AWS = require('aws-sdk');
const config = {
    convertEmptyValues: true,endpoint: 'localhost:8000', sslEnabled: false, region: 'local-env'
};
const dynamoDB = new AWS.DynamoDB.DocumentClient(config);

test('Verificar que guarda correctamente el producto en la tabla', async()=>{
    const datos = {
        id: '1',
        nombre: 'prueba',
        descripcion: 'descripcion prueba',
        marca: "marca",
        precio: 10000,
        fecha_registro: new Date().toISOString(),
        proveedor: 'prueba proveedor'
    };
    const params = {
        TableName:'producto', 
        Item:datos
    }
    //Insertar en la base de datos
    await dynamoDB.put(params).promise();
    //Vereificar si realmente inserto en la tabla producto
    const {Item} = await dynamoDB.get({TableName: 'producto', Key: {id: '1'}}).promise();
    expect(Item).toEqual(datos);

});