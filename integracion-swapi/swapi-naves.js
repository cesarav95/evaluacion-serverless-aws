'use strict';

const fetch = require('node-fetch')

const modelo = 'starships'

module.exports.recuperar_naves = async (event, context, callback) => {
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
    let data_naves = response_swapi.results;
    let array_naves = [];
    let e;
    for(e of data_naves){
      //Mapear los atributos del modelo film y traducirlos a español
      let datos_esp_nave = {
        MGLT : e.MGLT,
        capacidad_carga :e.cargo_capacity,
        consumibles: e.consumables,
        costo_en_creditos: e.cost_in_credits,
        creado: e.created,
        tripulacion: e.crew,
        editado : e.edited,
        indice_de_hiperimpulso: e.hyperdrive_rating,
        longituf: e.length,
        fabricante: e.manufacturer,
        velocidad_max_atmosferica: e.max_atmosphering_speed,
        modelo: e.model,
        pasajeros : e.passengers,
        peliculas: e.films,
        pilotos: e.pilots,
        clase_nave: e.starship_class,
        url: e.url
      };
      array_naves.push(datos_esp_nave);
    }   

    //Construir respuesta
    const response = {
      statusCode: 200,
      body: {
        total: response_swapi.count,
        siguiente: response_swapi.next,
        anterior: response_swapi.previous,
        resultados: array_naves
      },
    };
    //enviar respuesta
    callback(null, response);
  }catch(e){
    callback(e, null);    
  }
  return; 
};
