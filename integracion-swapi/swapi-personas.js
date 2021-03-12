'use strict';

const fetch = require('node-fetch')

const modelo = 'people'

module.exports.recuperar_personas = async (event, context, callback) => {
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
    let data_personas = response_swapi.results;
    let array_personas = [];
    let e;
    for(e of data_personas){
      //Mapear los atributos del modelo film y traducirlos a español
      let datos_esp_persona = {
        anio_nacimiento : e.birth_year,
        color_ojo :e.eye_color,
        peliculas: e.films,
        genero: e.gender,
        color_cabello: e.hair_color,
        altura: e.height,
        planeta_natal : e.homeworld,
        masa: e.mass,
        nombre: e.name,
        color_piel: e.skin_color,
        creado: e.created,
        editado: e.edited,
        especies : e.species,
        naves: e.starships,
        url: e.url,
        vehiculos: vehicles
      };
      array_personas.push(datos_esp_persona);
    }   

    //Construir respuesta
    const response = {
      statusCode: 200,
      body: {
        total: response_swapi.count,
        siguiente: response_swapi.next,
        anterior: response_swapi.previous,
        resultados: array_personas
      },
    };
    //enviar respuesta
    callback(null, response);
  }catch(e){
    callback(e, null);    
  }
  return; 
};
