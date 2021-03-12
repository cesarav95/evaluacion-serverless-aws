'use strict';

const fetch = require('node-fetch')

const modelo = 'planets'

module.exports.recuperar_planetas = async (event, context, callback) => {
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
    let data_planetas = response_swapi.results;
    let array_planetas = [];
    let e;
    for(e of data_planetas){
      //Mapear los atributos del modelo film y traducirlos a español
      let datos_esp_planeta = {
        clima : e.climate,
        creado :e.created,
        diametro: e.diameter,
        editado: e.edited,
        peliculas: e.films,
        gravedad: e.gravity,
        nombre : e.name,
        periodo_de_orbita: e.orbital_period,
        poblacion: e.population,
        residentes: e.residents,
        periodo_de_rotacion: e.rotation_period,
        superficie_acutica: e.surface_water,
        terreno : e.terrain,
        url: e.url
      };
      array_planetas.push(datos_esp_planeta);
    }   

    //Construir respuesta
    const response = {
      statusCode: 200,
      body: {
        total: response_swapi.count,
        siguiente: response_swapi.next,
        anterior: response_swapi.previous,
        resultados: array_planetas
      },
    };
    //enviar respuesta
    callback(null, response);
  }catch(e){
    callback(e, null);    
  }
  return; 
};
