'use strict';

const fetch = require('node-fetch')

const modelo = 'species'

module.exports.recuperar_especies = async (event, context, callback) => {
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
    let data_species = response_swapi.results;
    let array_especies = [];
    let e;
    for(e of data_species){
      //Mapear los atributos del modelo species y traducirlos a español
      let datos_esp_especie = {
        nombre : e.name,
        clasificacion :e.classification,
        denominacion: e.designation,
        altura_promedio: e.average_height,
        colores_piel: e.skin_colors,
        colores_pelo: e.hair_colors,
        colores_ojo : e.eye_colors,
        promedio_vida: e.average_lifespan,
        planeta_natal: e.homeworld,
        idioma: e.language,
        personas: e.people,
        peliculas: e.films,
        creado : e.created,
        editado: e.edited,
        url: e.url
      };
      array_especies.push(datos_esp_especie);
    }   

    //Construir respuesta
    const response = {
      statusCode: 200,
      body: {
        total: response_swapi.count,
        siguiente: response_swapi.next,
        anterior: response_swapi.previous,
        resultados: array_especies
      },
    };
    //enviar respuesta
    callback(null, response);
  }catch(e){
    callback(e, null);    
  }
  return; 
};
