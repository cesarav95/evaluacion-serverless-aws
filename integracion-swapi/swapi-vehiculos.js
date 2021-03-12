'use strict';

const fetch = require('node-fetch')

const modelo = 'vehicles'

module.exports.recuperar_vehiculos = async (event, context, callback) => {
  try{
    // Obtener datos del API Swapi
    let data_swapi = await fetch(
      process.env.BASE_URL_SWAPI+"/"+modelo, {
      method: 'GET',                   
      headers: {
        'Content-type': 'application/json'
      }
    });
    //convertir la respuesta de SWAPI a formato JSON
    let response_swapi = await data_swapi.json().catch(e => { if (e) { throw e } });
    let data_vehiculos = response_swapi.results;
    let array_vehiculos = [];
    let e;
    for(e of data_vehiculos){
      //Mapear los atributos del modelo vehicles y traducirlos a español
      let datos_esp_vehiculos = {
        capacidad_de_carga : e.cargo_capacity,
        consumibles :e.consumables,
        costo_en_creditos: e.cost_in_credits,
        creado: e.created,
        tripulacion: e.crew,
        editado: e.edited,
        longitud : e.length,
        fabricante: e.manufacturer,
        velocidad_max_atmosferica: e.max_atmosphering_speed,
        modelo: e.model,
        nombre: e.name,
        pasajeros: e.passengers,
        pilotos : e.pilots,
        peliculas: e.films,
        clase_de_vehiculo: vehicle_class,
        url: e.url
      };
      array_vehiculos.push(datos_esp_vehiculos);
    }   

    //Construir respuesta
    const response = {
      statusCode: 200,
      body: {
        total: response_swapi.count,
        siguiente: response_swapi.next,
        anterior: response_swapi.previous,
        resultados: array_vehiculos
      },
    };
    //enviar respuesta
    callback(null, response);
  }catch(e){
    callback(e, null);    
  }
  return; 
};
