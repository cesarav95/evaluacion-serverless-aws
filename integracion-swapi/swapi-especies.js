'use strict';

const swapi = require('./conexion-swapi')
const api = require('../utils/api-response')

const modelo = 'species'

module.exports.recuperar_especies = async (event, context, callback) => {
  try{    

    // Recuperar datos de swapi
    let data_swapi = await swapi.consultar(process.env.BASE_URL_SWAPI+"/"+modelo,'GET');
    //Verificar si hubo error al consultar a SWAPI
    if (!data_swapi.exito){
      callback(data_swapi.error, null);    
      return;
    }    
    let data_species = data_swapi.datos.results;
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
    let response = await api.construirRespuestaSwapi(200, data_swapi.datos, array_especies);
    //enviar respuesta
    callback(null, response);
  }catch(e){
    callback(e, null);    
  }
  return; 
};
