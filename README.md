# Evaluación Serverless AWS
Implementacion de un API utilizando el framework Serverless con Nodejs y DynamoDB, asi tambien la integracion con el API de StarWars SWAPI.

## Ejecutar API en local
* Primero instalar las dependencias con el comando:

    `npm install`
* Para correr el API de manera local ejecutar el siguiente comando (el cual inicial en el puerto 3000 - http://localhost:3000/dev/api):

    `serverless offline start`

## Deploy en AWS
* Primeramente se configura del acceso a AWS utilizando los credenciales de un suuario creado en el servicio IAM  de AWS.

    `serverless config credentials --provider aws --key YOUR_KEY --secret YOUR_SECRET`

* Luego se hace el deploy del API.

    `serverless deploy`

* Se hizo el deploy en una cuenta personal de AWS el cual esta disponible en: https://ako76ow3nc.execute-api.us-east-2.amazonaws.com/api/

## Integracion de SWAPI

Este API se integro con [SWAPI](https://swapi.py4e.com/documentation), para obtener los datos de este y traducir el nombre de sus atributos al español, las funciones implementadas para cada modelo se encuentran en la carpeta [integracion-swapi](https://github.com/cesarav95/evaluacion-serverless-aws).



Los End-points implementados  para probar la integracion con SWAPI son los siguientes :

* `GET` https://ako76ow3nc.execute-api.us-east-2.amazonaws.com/api/swapi-peliculas : Recupera obejtos del modelo pelicula de SWAPI.
* `GET` https://ako76ow3nc.execute-api.us-east-2.amazonaws.com/api/swapi-peliculas/{id}: Recupera un solo objeto del modelo pelicula de SWAPI, epecificando su **id** de objeto como parametro.

## DynamoDB
Se creo dos end-point para probar la conexion con DynamoDB con el modelo **producto** el cual contiene los siguientes atributos:

```json
{
    "nombre" : "nombre producto",
    "descripcion": "descripcion producto",
    "marca":"marca producto",
    "precio": 150,
    "proveedor":"preo"
}
```
Los end-points  implemnetados para probar la comexion a DynamoDB son:


* `GET` https://ako76ow3nc.execute-api.us-east-2.amazonaws.com/api/lista-productos : Recupera la lista de productos guardaos en la tabla **producto** de DynamoDB.
* `POST` https://ako76ow3nc.execute-api.us-east-2.amazonaws.com/api/guardar-producto: Guarda un objeto en la tabla **producto** de DynamoDB.