'use strict';

const swapi = require('./conexion-swapi')
const api = require('../utils/api-response')

const modelo = 'people'

module.exports.recuperar_personas = async (event, context, callback) => {
  try{
    // Obtener datos del API Swapi
    let data_swapi = await swapi.consultar(process.env.BASE_URL_SWAPI+"/"+modelo,'GET');
    //Verificar si hubo error al consultar a SWAPI
    if (!data_swapi.exito){
      callback(data_swapi.error, null);    
      return;
    }    
    let data_personas = data_swapi.datos.results;
    let array_personas = [];
    let e;
    for(e of data_personas){
      //Mapear los atributos del modelo people y traducirlos a español
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
    //Construir respuesta
    let response = await api.construirRespuestaSwapi(200, data_swapi.datos, array_personas);
    //enviar respuesta
    callback(null, response);
  }catch(e){
    callback(e, null);    
  }
  return; 
};
