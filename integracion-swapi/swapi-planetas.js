'use strict';

const swapi = require('./conexion-swapi')
const api = require('../utils/api-response')

const modelo = 'planets'

module.exports.recuperar_planetas = async (event, context, callback) => {
  try{
    // Obtener datos del API Swapi
    let data_swapi = await swapi.consultar(process.env.BASE_URL_SWAPI+"/"+modelo,'GET');
    //Verificar si hubo error al consultar a SWAPI
    if (!data_swapi.exito){
      callback(data_swapi.error, null);    
      return;
    }    
    let data_planetas = data_swapi.datos.results;
    let array_planetas = [];
    let e;
    for(e of data_planetas){
      //Mapear los atributos del modelo planets y traducirlos a español
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
    let response = await api.construirRespuestaSwapi(200, data_swapi.datos, array_planetas);
    //enviar respuesta
    callback(null, response);
  }catch(e){
    callback(e, null);    
  }
  return; 
};
